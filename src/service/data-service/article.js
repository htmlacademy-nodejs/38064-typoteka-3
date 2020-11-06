'use strict';

const {nanoid} = require(`nanoid`);
const {ID_LENGTH} = require(`../../utils/const`);


class ArticleService {

  /**
   * @param {Post[]} articles
   */
  constructor(articles) {
    this._articles = articles;
  }

  /**
   * @return {Post[]}
   */
  get articles() {
    return this._articles;
  }

  /**
   * @param {string} id
   * @return {Post}
   */
  getById(id) {
    return this._articles.find((article) => article.id === id);
  }

  /**
   * @param {LocalPost} article
   * @return {Post}
   */
  create(article) {
    /** @type {Post} */
    const newArticle = Object.assign({id: nanoid(ID_LENGTH), comments: []}, article);
    this._articles.push(newArticle);
    return newArticle;
  }

  /**
   * @param {string} id
   * @param {LocalPost} newArticle
   * @return {Post|null}
   */
  update(id, newArticle) {
    const oldArticle = this._articles.find((article) => article.id === id);
    if (!oldArticle) {
      return null;
    }
    return Object.assign(oldArticle, newArticle);
  }

  /**
   * @param {string} id
   * @return {Post|null}
   */
  delete(id) {
    const articleToDelete = this._articles.find((article) => article.id === id);
    if (!articleToDelete) {
      return null;
    }
    this._articles = this._articles.filter((article) => article.id !== id);
    return articleToDelete;
  }

}


module.exports = ArticleService;
