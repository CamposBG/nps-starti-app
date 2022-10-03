import BaseRepository from "~/repositories/BaseRepository";

export default class DashBoardRepository extends BaseRepository {
  constructor(baseUrl, context) {
    super(context);

    this.baseUrl = baseUrl;
  }

  async firstGraph(body) {
    return this.get("/dashboard", body);
  }

  async secondGraph(body) {
    return this.get("/dashboard/avg-by-day", body);
  }
}
