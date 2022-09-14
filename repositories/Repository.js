import BaseRepository from "~/repositories/BaseRepository";
import ProjectsRepository from "~/repositories/projects/ProjectsRepository";

export default class Repository {
    context = null;

    base = null;

    projects = null;

    constructor(context) {
        this.context = context;

        this.base = new BaseRepository(this.context);
        this.projects = new ProjectsRepository('/api/projects', this.context);

    }
}