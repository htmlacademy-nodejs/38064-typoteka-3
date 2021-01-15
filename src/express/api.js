'use strict';

const axios = require(`axios`);


const TIMEOUT = 1000;

const port = process.env.API_PORT || 3000;
const defaultURL = `http://localhost:${port}/api/`;


class API {

  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  /**
   * @return {Promise<Article[]>}
   */
  getArticles() {
    return this._load(`/articles`);
  }

  /**
   * @param {string} id
   * @return {Promise<Article>}
   */
  getArticleById(id) {
    return this._load(`/articles/${id}`);
  }

  /**
   * @param {string} articleId
   * @return {Promise<Comment[]>}
   */
  getComments(articleId) {
    return this._load(`/articles/${articleId}/comments`);
  }

  /**
   * @param {string} url
   * @param {AxiosRequestConfig?} options
   * @return {Promise<any>}
   * @private
   */
  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

}


const defaultAPI = new API(defaultURL, TIMEOUT);


module.exports = {
  getAPI: () => defaultAPI,
};
