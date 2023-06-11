import {makeAutoObservable} from 'mobx';
import {getFeed, loginUser, registrateUser} from "../services/userDataService";
import localStorageHelper from "../helpers/localStorageHelper";
import {getAreas, getArt, getTools, saveArt} from "../services/artDataService";
import {mapArtToSave} from "../helpers/mapper";
import ArtModel from "../models/ArtModel";
import {ART_ROUTE} from "../resources/consts";

export default class MainStore {
    token = null;
    isAuth = false;
    feed = [];
    tools = [];
    areas = [];
    art = { ...ArtModel };
    validationState = {
        auth: ``
    };
    loading = {
        feed: false,
        meta: true,
        art: false,
        saveArt: false,
        auth: false
    };

    constructor() {
        this.init();
        makeAutoObservable(this);
    }

    // ACTION //

    init = async () => {
        this.token = localStorageHelper.getLocalToken();
        this.isAuth = !!this.token;

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
        if (this.loading.feed) {
            return;
        }

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

    loadArt = async (id = ``) => {
        this.setLoading(`art`, true);

        try {
            const { ok, result } = await getArt(id);

            if (!ok) {
                throw new Error(`Ошибка загрузки произведения`);
            }

            this.art = { ...ArtModel, ...result };
        } catch (e) {
            console.error(e.message);
        } finally {
            this.setLoading(`art`, false);
        }
    }

    saveArt = async (art = {}) => {
        this.setLoading(`saveArt`, true);

        const [files, data] = mapArtToSave(art);

        try {
            const { ok, result } = await saveArt(files, data);

            if (ok && result) {
                window.location.replace(`${ART_ROUTE}/${result}`);
            }

            return ok;
        } catch (e) {
            console.error(e.message);
        } finally {
            this.setLoading(`saveArt`, false);
        }
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

    clearFeed = () => {
        this.feed = [];
    }

    get isValid() {
        return !this.validationState.some(error => !!error);
    }
}