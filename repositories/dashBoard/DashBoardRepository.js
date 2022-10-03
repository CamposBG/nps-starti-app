<<<<<<< HEAD
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
=======
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

  async getDashTableData(queryParams) {
    return this.get("/dashboard/votes-by-day", queryParams);
  }
}
>>>>>>> e682dc24158f405cea2eec320d442cc9955ac9ca
