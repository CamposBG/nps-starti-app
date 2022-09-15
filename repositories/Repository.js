import BaseRepository from "~/repositories/BaseRepository";
import UserRepository from "./users/UserRepository";

export default class Repository {
    context = null;

    base = null;

    user = null;

    constructor(context) {
        this.context = context;

        this.base = new BaseRepository(this.context);

        this.user = new UserRepository('/api', this.context)
    }

}