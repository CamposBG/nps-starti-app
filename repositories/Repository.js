import BaseRepository from "~/repositories/BaseRepository";
import UserRepository from "./users/UserRepository";
import ProjectsRepository from "~/repositories/projects/ProjectsRepository";
import AuthRepository from "~/repositories/auth/AuthRepository";
import WidgetsRepository from "~/repositories/widgets/WidgetsRepository";
import DashBoardRepository from "~/repositories/dashBoard/DashBoardRepository";
import ConfigEmailRepository from "~/repositories/config-email/ConfigEmailRepository";

export default class Repository {
  context = null;

  base = null;

  user = null;

  projects = null;

  auth = null;

  widgets = null;

  configEmail = null;

  constructor(context) {
    this.context = context;

    this.base = new BaseRepository(this.context);

    this.projects = new ProjectsRepository("/api/projects", this.context);

    this.auth = new AuthRepository("/api", this.context);

    this.user = new UserRepository("/api", this.context);

    this.projects = new ProjectsRepository("/api/projects", this.context);

    this.widgets = new WidgetsRepository("/api/widgets", this.context);

    this.configEmail = new ConfigEmailRepository("/api/mail-config", this.context);

    this.dash = new DashBoardRepository("/api", this.context);
  }
}
