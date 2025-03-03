const express = require("express");
const http = require("http");
const bot = require("./bot"); // Імпортуємо бот з bot.js

require("dotenv").config(); // Завантажуємо змінні середовища з .env

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const URL = process.env.SERVER_URL || "https://your-vercel-url.vercel.app"; // Задайте URL вашого сервера
const app = express();
const port = process.env.PORT || 3000;

if (!TOKEN) {
  console.error(
    "❌ TELEGRAM_BOT_TOKEN не знайдено! Перевірте змінні середовища."
  );
  process.exit(1);
}

// Налаштовуємо webhook
bot.setWebHook(`${URL}/bot${TOKEN}`);

app.use(express.json()); // Для парсингу JSON тіл запитів

// Обробка запитів на webhook
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Обробка маршруту на головній сторінці
app.get("/", (req, res) => {
  res.send("<h1>Привіт! Це твоя гра 🚀</h1><p>Додай сюди HTML+JS код гри!</p>");
});

// Запуск сервера
http.createServer(app).listen(port, () => {
  console.log(`HTTP сервер працює на порту ${port}`);
});
