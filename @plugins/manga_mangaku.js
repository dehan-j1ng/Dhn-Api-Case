const conn = require("../@functions/index");

exports.mangakuManga = async function mangaku(id, manga, quoted) {
  let txt = "Maaf User!\n";
  txt += "Harap Masukkan Manga yang ingin dicari!\n\n";
  txt += "Contoh: \n";
  txt += "/search mangaku&naruto";
  if (!manga) return conn.reply(id, conn.monospace(txt), quoted);
  
  try {
    await conn.reply(id, conn.mess.wait, quoted);
    let result = await conn.axios("https://api.dhnjing.xyz/anime/mangaku/search?manga=" + manga, "GET");
    let data = result.result;
    let line = 0;
    txt = "╳┼" + "─".repeat(3) + "🔹 DATA 🔸" + "─".repeat(3) + "┼╳\n\n";
    txt += `Query: ${manga}\n`;
    txt += `Request Status: ${result.status}\n`;
    txt += `Total Result: ${data.length}\n`;
    for (let i = 0; i < data.length; i++) {
      line += 1;
      txt += "╭──────────────────\n";
      txt += `+ Line: ${line.toString()}\n`;
      txt += `+ Manga: ${data[i].manga_name}\n`;
      txt += `+ Url: ${data[i].manga_url}\n`;
      txt += `+ Rating: ${data[i].manga_rating}\n`;
      txt += `+ Chapter: ${data[i].manga_chapter}\n`;
      txt += "╰──────────────────\n\n";
    }
    txt += "╳┼" + "─".repeat(2) + "🔸 the end 🔹" + "─".repeat(2) + "┼╳";
    console.table([{
      "Success with": {
        status: result.status,
        result: data.length
      }
    }]);
    return conn.reply(id, conn.monospace(txt), quoted);
  } catch (error) {
    console.log(conn.error(error));
    return conn.reply(id, conn.mess.errorCmd, quoted);
  }
};