const { Client, LocalAuth } = require('whatsapp-web.js');
const puppeteer = require('puppeteer');
const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const puppeteer = require("puppeteer");

const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

const client = new Client({
    puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'], },
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    console.log('Scan the QR code to log in:', qr);
});

client.on('authenticated', () => {
    console.log('WhatsApp client is authenticated');
});

client.on('ready', () => {
    console.log('Nova-x is ready');
});

client.on('message', message => {
    if (message.body === 'ping') {
        message.reply('pong');
    }
});

client.initialize();

app.get('/', (req, res) => {
    res.send('WhatsApp Bot is running');
});

app.get('/status', (req, res) => {
    if (client.pupBrowser) {
        res.send('Nova-x Bot is running');
    } else {
        res.send('Nova-x Bot is not connected');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', async () => {
    console.log('Gracefully shutting down...');
    await client.logout();
    process.exit(0);
});
