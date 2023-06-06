import {makeAutoObservable} from 'mobx';
import {getFeed, loginUser, registrateUser} from "../services/userDataService";
import localStorageHelper from "../helpers/localStorageHelper";
import {getAreas, getTools} from "../services/artDataService";

export default class MainStore {
    token = null;
    isAuth = false;
    feed = [];
    tools = [];
    areas = [];
    validationState = {
        auth: ``
    };
    loading = {
        feed: true,
        meta: true,
        art: false,
        auth: false,
    };

    constructor() {
        this.init();
        makeAutoObservable(this);
    }

    // ACTION //

    init = async () => {
        this.token = localStorageHelper.getLocalToken();
        // this.isAuth = !!this.token;
        this.isAuth = true;

        await this.loadMeta();
        await this.loadFeed();
    }

    loadMeta = async () => {
        this.setLoading(`meta`, true);

        try {
            const { ok: okTools, result: resultTools = [] } = await getTools();
            const { ok: okAreas, result: resultAreas = [] } = await getAreas();

            if (!okTools || !okAreas) {
                throw new Error(`Ошибка загрузки метаданных`);
            }

            this.tools = [...resultTools];
            this.areas = [...resultAreas];
        } catch (e) {
            console.error(e.message);
        } finally {
            this.setLoading(`meta`, false);
        }
    }

    loadFeed = async () => {
        this.setLoading(`feed`, true);

        try {
            const { ok, result = [] } = await getFeed();

            if (!ok) {
                throw new Error(`Ошибка загрузки ленты`);
            }

            this.feed = [...result];
        } catch (e) {
            console.error(e.message);
        } finally {
            this.setLoading(`feed`, false);
        }
    }

    login = async (login, password) => {
        this.setLoading(`auth`, true);

        try {
            const { result = {}, ok, description } = await loginUser({ login, password });

            if (!ok) {
                this.setValidationError(`auth`, description);

                return false;
            }

            if (result.token) {
                localStorageHelper.setLocalToken(result.token);
                this.isAuth = true;
            }

            return true;
        } catch (e) {
            console.error(e.message);
        } finally {
            this.setLoading(`auth`, false);
        }
    }

    registrate = async (login, email, password) => {
        this.setLoading(`auth`, true);

        try {
            const { ok, description } = await registrateUser({ username: login, email, password });

            if (!ok) {
                this.setValidationError(`auth`, description);

                return false;
            }

            const result = await this.login(email, password);

            return !!result;
        } catch (e) {
            console.error(e.message);
        } finally {
            this.setLoading(`auth`, false);
        }
    }

    unauthorize = () => {
        this.isAuth = false;
        localStorageHelper.deleteLocalToken();
    }

    setValidationError = (field, value) => {
        if (this.validationState.hasOwnProperty(field)) {
            this.validationState[field] = `${value}`;
        }
    }

    setLoading = (field, value) => {
        if (this.loading.hasOwnProperty(field)) {
            this.loading[field] = !!value;
        }
    }

    get isValid() {
        return !this.validationState.some(error => !!error);
    }
}