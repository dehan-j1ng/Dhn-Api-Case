/**
 *
 * #Example Case Api Wrapper "https://api.dhnjing.xyz/"
 * @dehan_j1ng
 * Dehan - Team
 * 
 */

// NPM Modules
const { 
    WAConnection,
} = require("@adiwajshing/baileys");
const fs = require("fs");

// Exported Function
const conn = require("../@functions/index");

// new Connection to Whatsapp Web
const client = new WAConnection();
exports.client = client;

// Connecting to Whatsapp Web
exports.connect = async () => {
    client.logger.level = 'warn';
    client.on('qr', (qr) => {
        console.log(conn.color("=> Scan QR Code"));
    });
    fs.existsSync('./session.json') && client.loadAuthInfo('./session.json');
    client.on('connecting', () => {
        console.log(conn.color("=> Connect"));
    });
    client.on('open', () => {
        console.log(conn.color("=> Success"));
    });
    await client.connect();
    fs.writeFileSync('./session.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'));
    return client;
};