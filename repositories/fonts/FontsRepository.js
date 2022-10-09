import BaseRepository from '../BaseRepository';

export default class FontsRepository extends BaseRepository {
  constructor(baseUrl, context) {
    super(context);

    this.baseUrl = baseUrl;
  }

  async getFonts() {
    return this.get('/fonts');
  }
}