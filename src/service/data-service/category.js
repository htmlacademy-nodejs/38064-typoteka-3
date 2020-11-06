'use strict';

class CategoryService {

  /**
   * @param {Post[]} articles
   */
  constructor(articles) {
    this._articles = articles;
  }

  /**
   * @return {string[]}
   */
  get categories() {
    const categories = this._articles.reduce((acc, article) => {
      article.category.forEach((category) => acc.add(category));
      return acc;
    }, new Set());
    return [...categories];
  }

}


module.exports = CategoryService;
