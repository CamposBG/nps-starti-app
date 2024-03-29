import BaseRepository from '../BaseRepository';

export default class WidgetsRepository extends BaseRepository {
  constructor(baseUrl, context) {
    super(context);

    this.baseUrl = baseUrl;
  }

  async createWidget(guid, body) {
    return this.post(`/${guid}`, body);
  }

  async updateWidgetStatus(guid, body) {
    return this.put(`/update-status/${guid}`, body);
  }

  async getOneWidget(guid) {
    return this.get(`/${guid}`);
  }

  async updateWidget(guid, body) {
    return this.put(`/${guid}`, body);
  }
}
