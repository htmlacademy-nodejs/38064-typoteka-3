'use strict';

const {nanoid} = require(`nanoid`);
const {ID_LENGTH} = require(`../../utils/const`);


class CommentService {

  /**
   * @param {Post} article
   * @return {Comment[]}
   */
  getAll(article) {
    return article.comments;
  }

  /**
   * @param {Post} article
   * @param {LocalComment} comment
   * @return {Comment}
   */
  create(article, comment) {
    const newComment = Object.assign({id: nanoid(ID_LENGTH)}, comment);
    article.comments.push(newComment);
    return newComment;
  }

  /**
   * @param {Post} article
   * @param {string} commentId
   * @return {Comment|null}
   */
  delete(article, commentId) {
    const commentToDelete = article.comments.find((comment) => comment.id === commentId);
    if (!commentToDelete) {
      return null;
    }
    article.comments = article.comments.filter((comment) => comment.id !== commentId);
    return commentToDelete;
  }

}


module.exports = CommentService;
