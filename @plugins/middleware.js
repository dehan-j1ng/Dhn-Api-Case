const conn = require("../@functions/index");
const command = require("./command");

exports.noParams = function handlerNoParams(id, text, quoted) {
  txt = "Maaf User!\n";
  txt += "Harap Masukkan Kategori Search yang diinginkan!\n\n";
  txt += "Yaitu: \n";
  txt += "/search Manga\n";
  if (!text) return conn.reply(id, conn.monospace(txt), quoted);
};

exports.search = function searchHandler(id, text, quoted) {
  if (text.match(/manga/gi)) {
    let data = command[0];
    let cmd = Object.keys(data)[0];
    let listCmd = data[cmd].listCmd;
    let usage = data[cmd].usage;
    txt = "╳┼" + "─".repeat(3) + "🔹 INFO 🔸" + "─".repeat(3) + "┼╳\n\n";
    txt += `-> Message: ${data["/search"].message}\n`;
    txt += "╭──────────────────\n";
    txt += `+ List Command: \n`;
    let line = 0;
    for (let i = 0; i < listCmd.length; i++) {
      line += 1;
      txt += `+ ${line.toString()} - ${cmd} ${listCmd[i]}\n`;
    }
    txt += "╰──────────────────\n\n";
    txt += "-> Usage:\n";
    txt += "╭──────────────────\n";
    let usageLine = 0;
    for (let i = 0; i < usage.length; i++) {
      usageLine += 1;
      txt += `+ ${usageLine.toString()} - ${cmd} ${usage[i]}\n`;
    }
    txt += "╰──────────────────\n\n";
    txt += "╳┼" + "─".repeat(2) + "🔸 the end 🔹" + "─".repeat(2) + "┼╳";
    return conn.reply(id, conn.monospace(txt), quoted);
  }
};