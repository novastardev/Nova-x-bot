const { Client, LocalAuth } = require('whatsapp-web.js');
const puppeteer = require('puppeteer-core');
const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // To load .env variables

// Initialize Express app
const app = express();

// Port to listen on
const port = process.env.PORT || 3000;

// Set up Puppeteer options to use a manually installed Chromium browser
const puppeteerOptions = {
  executablePath: '/usr/bin/chromium',  // Change this path if needed
  headless: true,  // Run Chromium in headless mode
};

// Initialize WhatsApp Web client
const client = new Client({
  puppeteer: puppeteerOptions,
  authStrategy: new LocalAuth(),  // Ensures authentication is saved to a file for session persistence
});

// Start the WhatsApp client
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

// Start WhatsApp Web client
client.initialize();

// Basic Web Server (For Health Check or Webhooks)
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

// Start Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle graceful shutdown (for Railway deployments)
process.on('SIGINT', async () => {
  console.log('Gracefully shutting down...');
  await client.logout();
  process.exit(0);
});