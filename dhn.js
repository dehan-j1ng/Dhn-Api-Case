/**
 *
 * #Example Case Api Wrapper "https://api.dhnjing.xyz/"
 * @dehan_j1ng
 * Dehan - Team
 * 
**/

// NPM Modules
const fs = require("fs");

// Exported Functions
const client = require("./@handler/connect").client;
require("./@handler/connect").connect();
const config = require("./config.json");
const conn = require("./@functions/index");
const api = require("./@plugins/index");

// Declared Variable
const ownerJid = config.owner + "@s.whatsapp.net";
let clientStatus = config.status;
let prefixStatus = config.prefix;

// Calling Client
client.on("chat-update", async (m) => {
  try {
    
    // Detecting Messages
    if (!m.hasNewMessage) return;
    msg = JSON.parse(JSON.stringify(m)).messages[0];
    if (!msg.message) return;
    
    // Main Variable
    const id = msg.key.remoteJid;
    const from = id.endsWith("@g.us");
    const sender = msg.key.fromMe ? client.user.jid : from ? msg.participant : id;
    const senderData = msg.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, "") };
    const senderName = msg.key.fromMe ? client.user.name : senderData.notify || senderData.vname || senderData.name || senderData.jid;
    var prefixRegEx = /^[!&z?=#.+\/]/gi;
    var type = Object.keys(msg.message)[0];
    const { totalChats, groupChats, privateChats } = await conn.totalChats();
    
    // Message Through to Ephemeral
    if (type === "ephemeralMessage") {
      msg.message = msg.message.ephemeralMessage.message;
      type = Object.keys(msg.message)[0];
    }
    
    // Check Messages is Prefix or Conversation
    let _chats = (type === "conversation" && msg.message.conversation) ? msg.message.conversation : (type == "imageMessage") && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == "videoMessage") && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == "extendedTextMessage") && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : "";
    let prefix = _chats.match(prefixRegEx) ? prefixRegEx.exec(_chats)[0] : "";
    let inputCmd = _chats.match(prefixRegEx) ? prefixRegEx.exec(_chats)["input"] : _chats;
    
    // Command & Params Message
    let chats = _chats.match(prefixRegEx) ? _chats.split(prefixRegEx).find(v => v === _chats.replace(prefixRegEx, "")) : _chats;
    let command = chats.split(/ +/g)[0];
    let params = inputCmd.split(" ").splice(1).join(" ");
    
    // Message Metadata
    m.msg = {
      clientStatus: !clientStatus ? "Self" : "Public",
      prefixStatus: prefixRegEx ? "In Prefix" : "No Prefix",
      prefix: prefix,
      command: command,
      params: params,
      senderJid: sender,
      senderNumber: sender.split("@")[0],
      senderName: senderName,
      from: from ? "Group Chat" : "Private Chat",
      senderIn: id,
      text: _chats,
      metadata: {
        id: msg.key.id,
        fromMe: msg.key.fromMe,
        isOwner: sender === ownerJid ? true : false,
        type: Object.keys(msg.message)[0],
        count: m.count ? m.count : false,
        messageActive: m.count > 1 ? true : false,
      },
      quotedM: function() {
        try {
          let quotedData = msg.message[type].contextInfo.quotedMessage;
          let quotedType = Object.keys(quotedData);
          let quotedMsg = quotedData[quotedType];
          return {
            type: quotedType,
            data: quotedMsg
          };
        } catch (error) {
          console.log(error);
          return "Not Quoted Any Message";
        }
      },
    };
    
    // Detect Message - Command - Params
    console.log(conn.color(conn.message(m.msg.clientStatus, sender === ownerJid ? "Owner" : "User", senderName, id)));
    if (prefix && command) console.log(m.msg);
    
    // Change the Status to True Or False (Boolean)
    if (!clientStatus) if (!msg.key.fromMe) return;
    if (prefixStatus) if (_chats.startsWith(command)) return;
    
    // Switch to Actions
    switch (command) {
      case "help":
      case "command": {
        conn.command(id, sender, senderName, !clientStatus ? "Self" : "Public", prefixStatus ? prefix : "No Prefix", totalChats, groupChats, privateChats, msg);
        break;
      }
      case "noprefix": {
        prefixStatus = false;
        await conn.reply(id, !prefixStatus ? "No Prefix Active!" : "Prefix Active!", msg);
        break;
      }
      case "prefix": {
        prefixStatus = true;
        await conn.reply(id, prefixStatus ? "Prefix Active!" : "No Prefix Active!", msg);
        break;
      }
      case "self": {
        clientStatus = false;
        await conn.reply(id, !clientStatus ? "Self On" : "Public On");
        break;
      }
      case "public": {
        clientStatus = true;
        await conn.reply(id, clientStatus ? "Public On" : "Self On");
        break;
      }
      case ">": {
        try {
          _eval = conn.formatData(await eval(`(async () => { ${params} })();`));
          await conn.reply(id, _eval, msg);
        } catch (error) {
          console.log(conn.error(error));
          return conn.reply(id, conn.mess.errorCmd, msg);
        }
        break;
      }
      case "term": {
        if (!params) return conn.reply(id, conn.mess.noParams, msg);
        require("child_process").exec(params, (err, stdout) => {
          if (err) return conn.reply(id, conn.monospace(err), msg);
          if (stdout) {
            return conn.reply(id, conn.monospace(stdout), msg);
          }
        });
        break;
      }
      case "search": {
        if (!params) return api.mess.noParams(id, params, msg);
        let query = params.split("&");
        if (params.match(/animeplanet/gi)) {
          return await api.mangaAnimeplanet(id, query[1], msg);
        } else if (params.match(/komikfox/gi)) {
          return await api.mangaKomikfox(id, query[1], msg);
        } else if (params.match(/komikstation/gi)) {
          return await api.mangaKomikstation(id, query[1], msg);
        } else if (params.match(/kiryuu/gi)) {
          return await api.mangaKiryuu(id, query[1], msg);
        } else if (params.match(/kiss/gi)) {
          return await api.mangaKissmanga(id, query[1], msg);
        } else if (params.match(/klik/gi)) {
          return await api.mangaKlikmanga(id, query[1], msg);
        } else if (params.match(/mangaku/gi)) {
          return await api.mangaMangaku(id, query[1], msg);
        } else {
          return await api.mess.search(id, params, msg);
        }
        break;
      }
    }
  } catch (error) {
    if (!String(error).includes("this.isZero")) {
      console.log(error);
    }
  }
});