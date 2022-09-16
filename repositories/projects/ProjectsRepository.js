import BaseRepository from '../BaseRepository';

export default class ProjectsRepository extends BaseRepository {
    constructor(baseUrl, context) {
        super(context);

        this.baseUrl = baseUrl;
    }

    async listProjects(search = '') {
        return this.get(`/?search=${search}`);
    }

    async createProject(body) {
        return this.post('/', body);
    }

    async findOneProject(guid) {
        return this.get(`/${guid}`)
    }

    async updateProject(guid, body) {
        return this.put(`/${guid}`, body)
    }

    async deleteProject(guid) {
        return this.delete(`/${guid}`)
    }
}
