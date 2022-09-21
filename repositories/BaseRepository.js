import axios from "axios";
import {useStorage} from "vue3-storage";
import {useProgress} from "@marcoschulte/vue3-progress";

export default class BaseRepository {
  baseUrl = null;

  context = null;

  _axios = null;

  constructor(context) {
    this.context = context;
    this._axios = axios.create();
    const progresses = [];

    const finish = () => {
      setTimeout(() => progresses.pop()?.finish(), 200);
    };

    this._axios.interceptors.request.use(
      (config) => {
        progresses.push(useProgress().start());
        context.$bus.emit("progress-bar:start");

        return config;
      },
      (error) => Promise.reject(error)
    );
    this._axios.interceptors.response.use(
      (response) => {
        finish();
        context.$bus.emit("progress-bar:done");
        return response;
      },
      (error) => {
        finish();
        return Promise.reject(error);
      }
    );
  }


  async handleLogout() {
    const store = useStorage();

    const userData = store.getStorageSync("user");
    if (userData) {
      await this.context.$repo.auth.logout({token: userData.token});
      store.clearStorageSync()
    }
    this.context.$bus.emit('drawer:close');
    this.context.$bus.emit('logout');
  }

  catchError(error) {
    let msgError = "";

    if (error.response && typeof error.response.data === "object") {
      const {data} = error.response;

      if (error.response.status === 401) {
        // this.context.$bus.emit("logout");
        this.handleLogout();
        return
      }

      if (data.errors !== undefined) {
        data.errors.forEach((err) => {
          msgError += `${err.field} => ${err.message} <br>`;
        });
      } else if (data.error !== undefined) {
        msgError = `[${data.error.code}] ${data.error.message}`;
      }
    }

    return {error: msgError};
  }

  _getHeaders(bodyFormData = false) {
    const store = useStorage();
    const headers = {
      Accept: "application/json",
    };
    if (!bodyFormData) {
      headers["Content-Type"] = "application/json";
    }

    const userData = store.getStorageSync("user");
    if (userData && userData.token !== undefined) {
      headers.Authorization = userData.token;
    }

    return headers;
  }

  post(url, body, noCatch = false) {
    const fetchOptions = {
      method: "POST",
      baseURL: this.baseUrl,
      headers: this._getHeaders(body instanceof FormData),
    };
    if (noCatch) {
      return this._axios
        .post(url, body, fetchOptions)
        .then((response) => response.data);
    }
    return this._axios
      .post(url, body, fetchOptions)
      .then((response) => response.data)
      .catch((error) => this.catchError(error));
  }

  get(url, params = {}, noCatch = false) {
    const fetchOptions = {
      method: "GET",
      baseURL: this.baseUrl,
      params,
      headers: this._getHeaders(),
    };
    if (noCatch) {
      return this._axios
        .get(url, fetchOptions)
        .then((response) => response.data);
    }
    return this._axios
      .get(url, fetchOptions)
      .then((response) => response.data)
      .catch((error) => this.catchError(error));
  }

  delete(url, params = {}) {
    return this._axios
      .delete(url, {
        method: "DELETE",
        baseURL: this.baseUrl,
        params,
        headers: this._getHeaders(),
      })
      .then((response) => response.data)
      .catch((error) => this.catchError(error));
  }

  put(url, body = {}) {
    return this._axios
      .put(url, body, {
        method: "PUT",
        baseURL: this.baseUrl,
        headers: this._getHeaders(body instanceof FormData),
      })
      .then((response) => response.data)
      .catch((error) => this.catchError(error));
  }
}
