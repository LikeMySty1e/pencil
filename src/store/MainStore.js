import {makeAutoObservable, reaction, runInAction} from 'mobx';

export default class MainStore {
    isAuth = false;

    constructor() {
        this.init();
        makeAutoObservable(this);
    }

    // ACTION //

    init = async () => {

    }
}