'use strict';

class SearchService {

  /**
   * @param {Article[]} articles
   */
  constructor(articles) {
    this._articles = articles;
  }

  /**
   * @param {string} searchText
   * @return {Article[]}
   */
  find(searchText) {
    return this._articles.filter((article) => article.title.toLowerCase().includes(searchText.toLowerCase()));
  }

}


module.exports = SearchService;
