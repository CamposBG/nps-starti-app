import BaseRepository from "~/repositories/BaseRepository";
import UserRepository from "./users/UserRepository";
import ProjectsRepository from "~/repositories/projects/ProjectsRepository";
import AuthRepository from "~/repositories/auth/AuthRepository";

export default class Repository {
  context = null;

  base = null;

  user = null;
  
  projects = null;

  auth = null;


  constructor(context) {
    this.context = context;

    this.base = new BaseRepository(this.context);

    this.projects = new ProjectsRepository('/api/projects', this.context);

    this.auth = new AuthRepository('/api', this.context);

    this.user = new UserRepository('/api', this.context);
    
    this.projects = new ProjectsRepository("/api/projects", this.context);
  }
}
