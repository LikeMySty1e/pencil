import {makeAutoObservable, reaction, runInAction} from 'mobx';
import localStorageHelper from "../helpers/localStorageHelper";
import {
    addNews, changeRole,
    deleteNews, editNews, getAllUsers,
    getAvatar,
    getDateTime,
    getNews,
    getUser,
    getVisitCount,
    login,
    registration
} from "../services/userDataService";
import RoleEnum from "../enums/RoleEnum";
import StatusEnum from "../enums/StatusEnum";
import httpClientHelper from "../http/httpClientHelper";

const defaultAvatarUrl = `./pictures/no-img.jpg`;

const defaultUserModel = {
    login: ``,
    role: RoleEnum.user
};

let alertTimeout;

export default class MainStore {
    _isAuth = false;
    login = null;
    password = null;
    avatar = defaultAvatarUrl;
    user = defaultUserModel;
    alertMessage = ``;
    // settings = {
    // };
    news = [];
    roles = [];
    datetime = null;
    visits = null;
    pendingState = {
        user: true,
        loading: true,
        roles: true,
        news: true
    };

    constructor() {
        this.init();
        makeAutoObservable(this);
    }

    // ACTION //

    init = async () => {
        this.initAuth();

        await this.loadUserData();
        await this.initMetadata();

        reaction(this.isAuth, () => {
            this.loadUserData();
            this.initMetadata();
        })
    }

    initAuth = () => {
        this._isAuth = localStorageHelper.getLocalToken();
    }

    initMetadata = () => {
        if (!this.isAuth) {
            return;
        }

        this.setLoading(true);

        Promise.all([getDateTime(), getVisitCount()])
            .then(([datetime, visits]) => {
                this.datetime = datetime?.data?.message;
                this.visits = visits?.data?.message;

                this.setLoading(false);
            })
            .catch(e => console.log(e));
    }

    loadUserData = () => {
        if (!this.isAuth) {
            return;
        }

        this.setUserLoading(true);

        getUser()
            .then(response => {
                if (response.data.status === StatusEnum.Fail) {
                    throw new Error({ message: `Не удалось загрузить данные пользователя` });
                }

                this.user = response.data || defaultUserModel;
                this.loadAvatar();
                this.setUserLoading(false);
            }).catch(e => this.setAlert(e.message));
    }

    loginUser = async () => {
        const { data } = await login(this.login, this.password);

        if (data.status === StatusEnum.Fail) {
            throw new Error({ message: data.message || `Запрос авторизации вернул ошибку` });
        }

        this.setIsAuth(true);
    }

    registrateUser = async () => {
        const { data } = await registration(this.login, this.password);

        if (data.status === StatusEnum.Fail) {
            throw new Error({ message: data.message || `Запрос регистрации вернул ошибку` });
        }

        this.setIsAuth(true);
    }

    uploadAvatar = e => {
        const file = e.target.files[0];

        if (file.type !== 'image/jpeg') {
            this.setAlert("Можно загрузить файл только в формате JPEG");

            return;
        }

        httpClientHelper.upload(`/files/image`, { file })
            .then(() => this.loadAvatar());
    }

    loadAvatar = () => {
        if (!this.user.login) {
            return;
        }

        getAvatar(this.user.login)
            .then(response => {
                if (response.data) {
                    this.avatar = window.URL.createObjectURL(response.data);
                }
            });
    }

    loadNews = () => {
        this.setNewsLoading(true);

        getNews()
            .then(response => {
                this.news = response.data || [];
                this.setNewsLoading(false);
            });
    }

    loadRoles = () => {
        if (this.user.role !== RoleEnum.admin) {
            return;
        }

        this.setRolesLoading(true);

        getAllUsers()
            .then(users => {
                this.roles = users.data || [];
                this.setRolesLoading(false);
            });
    }

    changeUserRole = data => {
        this.setRolesLoading(true);

        changeRole(data)
            .then(response => {
                if (response.data.status === StatusEnum.Fail) {
                    throw new Error({ message: `Произошла ошибка при редактировании роли` });
                }

                this.loadRoles();
            })
    }

    editParagraph = data => {
        editNews(data)
            .then(response => {
                if (response.data.status === StatusEnum.Fail) {
                    throw new Error({ message: `Произошла ошибка при редактировании новости` });
                }

                this.loadNews();
            }).catch(e => this.setAlert(e.message));
    }

    deleteParagraph = id => {
        deleteNews(id)
            .then(response => {
                if (response.data.status === StatusEnum.Fail) {
                    throw new Error({ message: `Произошла ошибка при попытке удалить новость` });
                }

                this.loadNews();
            }).catch(e => this.setAlert(e.message));
    }

    addParagraph = data => {
        addNews({ ...data, author: this.login })
            .then(response => {
                if (response.data.status === StatusEnum.Fail) {
                    throw new Error({ message: `Произошла ошибка при попытке добавить новость` });
                }

                this.loadNews();
            }).catch(e => this.setAlert(e.message));
    }

    setAlert = message => {
        clearTimeout(alertTimeout);
        this.alertMessage = message;

        alertTimeout = setTimeout(() => {
            runInAction(() => {
                this.alertMessage = ``;
            });
        }, 5000);
    }

    setLogin = value => {
        this.login = value;
    }

    setPassword = value => {
        this.password = value;
    }

    setIsAuth = isAuth => {
        isAuth ? localStorageHelper.setLocalToken(`is auth: ${isAuth}`) : localStorageHelper.deleteLocalToken();

        this._isAuth = isAuth;
    }

    setLoading = state => {
        this.pendingState.loading = !!state;
    }

    setNewsLoading = state => {
        this.pendingState.news = !!state;
    }

    setUserLoading = state => {
        this.pendingState.user = !!state;
    }

    setRolesLoading = state => {
        this.pendingState.roles = !!state;
    }

    unauthorise = () => {
        this.token = null;
        this._isAuth = false;
        localStorageHelper.deleteLocalToken();
    }

    // COMPUTED //

    get isAuth() {
        return this._isAuth;
    }

    get isHighAccessAccount() {
        return this.user.role === RoleEnum.admin || this.user.role === RoleEnum.moderator;
    }

    get isAdmin() {
        return this.user.role === RoleEnum.admin;
    }

    get isLoading() {
        return this.pendingState.loading;
    }

    get isNewsLoading() {
        return this.pendingState.news;
    }

    get isUserLoading() {
        return this.pendingState.user;
    }

    get isRolesLoading() {
        return this.pendingState.roles;
    }
}