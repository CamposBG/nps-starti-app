import BaseRepository from "~/repositories/BaseRepository";

export default class AuthRepository extends BaseRepository{
    constructor(baseUrl, context) {
        super(context);

        this.baseUrl = baseUrl;
    }

    async login(body) {
        return this.post('/login', body)
    }

    async logout(body) {
        return this.post('/logout', body);
    }
}