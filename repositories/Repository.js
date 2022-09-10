import BaseRepository from "~/repositories/BaseRepository";

export default class Repository {
    context = null;

    base = null;

    constructor(context) {
        this.context = context;

        this.base = new BaseRepository(this.context);
    }
}