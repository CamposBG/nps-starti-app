import BaseRepository from '../BaseRepository';

export default class WidgetsRepository extends BaseRepository {
  constructor(baseUrl, context) {
    super(context);

    this.baseUrl = baseUrl;
  }

  async createWidget(guid, body) {
    return this.post(`/${guid}`, body);
  }
}
