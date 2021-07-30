const fs = require("fs");
const x = require("../@handler/connect");
const config = require("../config");
const conn = require("./index");
let cmd = require("../@plugins/command.json");

exports.reply = function quoted(jid, text, quoted) {
  return x.client.sendMessage(jid, text, "conversation", { quoted });
};

exports.sendImage = function image(jid, image, caption, quoted) {
  return x.client.sendMessage(jid, image, "imageMessage", { quoted , caption });
};

exports.command = async function listCmd(jid, senderJid, senderName, clientStatus, prefixStatus, totalChats, groupChats, privateChats, quoted) {
  
let command = `╳┼${"─".repeat(3)}🔹 COMMAND 🔸${"─".repeat(3)}┼╳

-> Hai ${senderName}
╭──────────────────
+ -> Info
+ Name: ${config.clientName}
+ Status: ${clientStatus}
+ Prefix: "${prefixStatus}"
+ Owner: @${config.owner}
+ Total Chats: ${totalChats.length}
+ Group Chats: ${groupChats.length}
+ Private Chats: ${privateChats.length}
╰──────────────────

╭──────────────────
+ -> List Command\n`;
line = 0;
for (let i = 0; i < cmd.length; i++) {
  let listCommand = Object.keys(cmd[i]);
  line = 1;
  command += `+ ${line.toString()}. ${listCommand}\n`;
}
command += `╰──────────────────

╭──────────────────
+ -> Thanks:
+ Allah SWT
+ @adiwajshing/baileys
+ @dehan_j1ng
╰──────────────────`;

  let mentionedJid = [config.owner + "@s.whatsapp.net", senderJid];
  return x.client.sendMessage(jid, conn.monospace(command), "conversation", { quoted, contextInfo: { mentionedJid } });
};

exports.message = function chats(status, from, senderName, inChat) {
  return "[ MSG ] > [ STATS ] " + status + " > [ FROM ] " + from + " > [ ALIAS ] " + senderName + " > [ IN ] " + inChat;
};

exports.sendContact = function contacts(id, contactName, contactNumber, quoted) {
  if (contactNumber.match("@s.whatsapp.net"))
  contactNumber = contactNumber.split("@")[0];
  
  let contactMessage = {
    displayName:  contactName,
    vcard: "BEGIN:VCARD\n VERSION:3.0\n FN:" + contactName + "\n item1.TEL;waid=" + contactNumber + ":+" + contactNumber + "\n item1.X-ABLabel:Mobile\n END:VCARD"
  };
  return x.client.sendMessage(id, contactMessage, "contactMessage", { quoted });
};

exports.totalChats = async function totalMsg() {
  let chatsAll = await x.client.chats.all();
  let totalChats = [];
  let groupChats = [];
  let privateChats = [];
  for (let id of chatsAll) {
    totalChats.push(id.jid);
    id.jid.match("@g.us") ? groupChats.push(id.jid) : {};
    id.jid.match("@s.whatsapp.net") ? privateChats.push(id.jid) : {};
  }
  return {
    totalChats,
    groupChats,
    privateChats
  };
};