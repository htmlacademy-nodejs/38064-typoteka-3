'use strict';

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

}


module.exports = ArticleService;
