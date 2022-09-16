import BaseRepository from "../BaseRepository";

export default class UserRepository extends BaseRepository {
  constructor(baseUrl, context) {
    super(context);

    this.baseUrl = baseUrl;
  }
  
  async storeUser(body) {
    return this.post("/users", body);
  }
  
  async getOneUser(guid) {
    return this.get(`/users/${guid}`)
  }

  async editUser(guid, body) {
    return this.put(`/users/${guid}`, body);
  }

  async listUsers(page){
    return this.get(`/users/?page=${page}`)
  }

}