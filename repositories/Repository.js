import BaseRepository from "~/repositories/BaseRepository";
import UserRepository from "./users/UserRepository";
import ProjectsRepository from "~/repositories/projects/ProjectsRepository";

export default class Repository {
  context = null;

  base = null;

  user = null;
  projects = null;

  constructor(context) {
    this.context = context;

    this.base = new BaseRepository(this.context);

    this.user = new UserRepository("/api", this.context);
    
    this.projects = new ProjectsRepository("/api/projects", this.context);
  }
}
