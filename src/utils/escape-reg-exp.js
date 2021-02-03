'use strict';

/**
 * @param {string} string
 * @return {string}
 */
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
};


module.exports = escapeRegExp;
