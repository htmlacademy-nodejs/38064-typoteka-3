'use strict';

const escapeRegExp = require(`../../utils/escape-reg-exp`);


/**
 * @param {string} text
 * @param {string} query
 * @return {string}
 */
const highlightInBold = (text, query) => {
  const escapedRegExp = escapeRegExp(query);
  const regExp = new RegExp(escapedRegExp, `ig`);
  return text.replace(regExp, `<b>$&</b>`);
};


module.exports = {
  highlightInBold,
};
