const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const bot = require("./bot"); // Імпортуємо бота з bot.js

const app = express();
const port = process.env.PORT || 3000;

// Тілери для обробки POST запитів від Telegram
app.use(bodyParser.json()); // Парсимо JSON

// Обробляємо вебхук для Telegram
app.post(`/bot${process.env.TELEGRAM_BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body); // Обробляємо оновлення від Telegram
  res.sendStatus(200); // Повертаємо статус 200
});

// Головна сторінка
app.get("/", (req, res) => {
  res.send("<h1>Привіт! Це твоя гра 🚀</h1><p>Додай сюди HTML+JS код гри!</p>");
});

// Статичні файли (якщо у вас є папка public, в якій зберігаються HTML, CSS, JS)
app.use(express.static("public")); // Це дозволяє сервера віддавати статичні файли

// Стартуємо HTTP сервер
http.createServer(app).listen(port, () => {
  console.log(`Сервер працює на порту ${port}`);
});
