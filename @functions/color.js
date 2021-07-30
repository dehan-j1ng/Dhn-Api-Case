const chalk = require("chalk");

exports.color = function color(text, color) {
  return !color ? chalk.greenBright(text) : chalk.keyword(color)(text);
};

exports.error = function error(text) {
  return chalk.redBright(text);
};

exports.success = function success(text) {
  return chalk.greenBright(text);
};