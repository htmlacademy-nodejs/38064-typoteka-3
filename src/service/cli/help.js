'use strict';

const chalk = require(`chalk`);


const run = () => {
  const text = `${chalk.cyan(`Help`)}
${chalk.green(`
FAQ:
service.js <command>

Commands:
--version               display program version
--help                  display this faq
--generate <count>      generate file mocks.json`)}`;

  console.log(text);
};

module.exports = {
  name: `--help`,
  run,
};
