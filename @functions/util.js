exports.formatData = function util(data) {
  let result = require("util").format(data);
  return result;
};

exports.inspectData = function util(data) {
  let result = require("util").inspect(data);
  return result;
};

exports.monospace = function txtMonospace(string) {
  return "```" + string + "```";
};