const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// ================= BOT =================
console.log("🚀 Nova-X starting...");

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    }
});

// ================= QR =================
client.on("qr", (qr) => {
    console.log("📲 Scan this QR:");
    qrcode.generate(qr, { small: true });
});

// ================= READY =================
client.on("ready", () => {
    console.log("✅ Nova-X connected to WhatsApp Web!");
});

// ================= MESSAGE HANDLER =================
client.on("message", async (message) => {

    const text = message.body;

    console.log("📩:", text);

    // simple AI logic (placeholder for now)
    let reply = "Nova-X is online 🤖";

    if (text.toLowerCase().includes("hello")) {
        reply = "Hey 👋 I'm Nova-X, your assistant.";
    }

    if (text.toLowerCase().includes("error")) {
        reply = "Send me the error, I'll debug it ⚙️";
    }

    await message.reply(reply);
});

// ================= START =================
client.initialize();