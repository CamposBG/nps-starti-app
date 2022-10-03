import BaseRepository from '../BaseRepository';

export default class ConfigEmailRepository extends BaseRepository {
  constructor(baseUrl, context) {
    super(context);

    this.baseUrl = baseUrl;
  }

  async saveConfig(body) {
    return this.post('/', body);
  }

  async updateConfig(body) {
    return this.put('/', body);
  }

  async deleteConfig() {
    return this.delete('/');
  }

  async getConfig() {
    return this.get('/');
  }

  async testConfig( body) {
    return this.post('/', body);
  }
}
