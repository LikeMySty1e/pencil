import {makeAutoObservable} from 'mobx';
import {getFeed} from "../services/userDataService";

export default class MainStore {
    isAuth = false;
    feed = [];
    loading = {
        feed: true
    }

    constructor() {
        this.init();
        makeAutoObservable(this);
    }

    // ACTION //

    init = async () => {
        await this.loadFeed();
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

    setLoading = (field, value) => {
        if (this.loading.hasOwnProperty(field)) {
            this.loading[field] = !!value;
        }
    }
}