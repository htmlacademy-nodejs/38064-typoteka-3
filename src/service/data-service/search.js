'use strict';

class SearchService {

  /**
   * @param {Post[]} articles
   */
  constructor(articles) {
    this._articles = articles;
  }

  /**
   * @param {string} searchText
   * @return {Post[]}
   */
  find(searchText) {
    return this._articles.filter((article) => article.title.toLowerCase().includes(searchText.toLowerCase()));
  }

}


module.exports = SearchService;
