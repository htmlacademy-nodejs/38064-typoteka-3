'use strict';

const dayjs = require(`dayjs`);


/**
 * Возвращает строку с датой в формате DD.MM.YYYY, HH:mm
 * @param {string} dateString валидная дата в формате ISO-string
 * @param {boolean} withoutTime
 * @return {string}
 */
const humanizeDate = (dateString, withoutTime = false) => {
  const dayjsDate = dayjs(dateString);
  if (dayjsDate.isValid()) {
    return withoutTime ? dayjsDate.format(`DD.MM.YYYY`) : dayjsDate.format(`DD.MM.YYYY, HH:mm`);

  } else {
    return ``;
  }
};
// TODO


module.exports = {
  humanizeDate,
};
