import BaseRepository from "../BaseRepository";

export default class UserRepository extends BaseRepository {
  constructor(baseUrl, context) {
    super(context);

    this.baseUrl = baseUrl;
  }
  async storeUser(body) {
    console.log("aqui")
    return this.post("/user", body);
  }

}