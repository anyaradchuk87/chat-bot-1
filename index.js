// const { bot, startBot } = require("./bot");

// module.exports = async (req, res) => {
//   try {
//     const body = req.body;

//     if (body && body.message) {
//       bot.processUpdate(body);
//     }

//     res.status(200).send("Бот отримав оновлення!");
//   } catch (error) {
//     console.error("Помилка:", error);
//     res.status(500).send("Щось пішло не так...");
//   }
// };

// startBot();

// // const express = require("express");
// // const http = require("http");
// // const bodyParser = require("body-parser");
// // const bot = require("./bot"); // Імпортуємо бота з bot.js

// // const app = express();
// // const port = process.env.PORT || 3000;

// // // Тілери для обробки POST запитів від Telegram
// // app.use(bodyParser.json()); // Парсимо JSON

// // // Обробляємо вебхук для Telegram
// // app.post(`/bot${process.env.TELEGRAM_BOT_TOKEN}`, (req, res) => {
// //   bot.processUpdate(req.body); // Обробляємо оновлення від Telegram
// //   res.sendStatus(200); // Повертаємо статус 200
// // });

// // // Головна сторінка
// // app.get("/", (req, res) => {
// //   res.send("<h1>Привіт! Це твоя гра 🚀</h1><p>Додай сюди HTML+JS код гри!</p>");
// // });

// // // Статичні файли (якщо у вас є папка public, в якій зберігаються HTML, CSS, JS)
// // app.use(express.static("public")); // Це дозволяє сервера віддавати статичні файли

// // // Стартуємо HTTP сервер
// // http.createServer(app).listen(port, () => {
// //   console.log(`Сервер працює на порту ${port}`);
// // });

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

require("dotenv").config(); // Завантажуємо змінні середовища з .env

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const URL = process.env.SERVER_URL || "https://your-deployment-url.com"; // Замініть на ваш URL
const PORT = process.env.PORT || 3000;

// Перевірка на наявність токена
if (!TOKEN) {
  console.error(
    "❌ TELEGRAM_BOT_TOKEN не знайдено! Перевірте змінні середовища."
  );
  process.exit(1);
}

// Ініціалізація бота
const bot = new TelegramBot(TOKEN, { webHook: true });

// Створення Express додатку
const app = express();

// Middleware для парсингу JSON вхідних запитів
app.use(bodyParser.json());

// Налаштовуємо вебхук для Telegram
bot.setWebHook(`${URL}/bot${TOKEN}`);

// Обробка оновлень від Telegram
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Головна сторінка
app.get("/", (req, res) => {
  res.send("<h1>Привіт! Це твоя гра 🚀</h1><p>Додай сюди HTML+JS код гри!</p>");
});

// Обробка команд Telegram бота
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Оберіть дію:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📋 Подивитися меню", callback_data: "menu" }],
        [{ text: "ℹ️ Пароль", callback_data: "info" }],
        [{ text: "⏳ Таймер 30 сек", callback_data: "timer" }],
        [
          {
            text: "Запустити гру",
            web_app: {
              url: `${URL}/game`, // Вказуємо URL до вашої гри (можна створити додаткову сторінку)
            },
          },
        ],
      ],
    },
  });
});

// Обробка натискання кнопок
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "menu") {
    bot.sendMessage(chatId, "Тут буде ваше меню 🍽️");
  } else if (query.data === "info") {
    bot.sendMessage(chatId, "84.67.106.83"); // Пароль або інша інформація
  } else if (query.data === "timer") {
    bot.sendMessage(chatId, "Таймер запущено! Зачекайте 30 секунд... ⏳");
    setTimeout(() => {
      bot.sendMessage(chatId, "⏰ Час вийшов! 🎉");
    }, 30000); // 30 секунд
  }

  bot.answerCallbackQuery(query.id); // Закриваємо запит, щоб уникнути помилок
});

// Статичні файли (якщо є додаткові файли для гри або іншого контенту)
app.use(express.static("public")); // Папка public для статичних файлів, наприклад HTML, CSS, JS

// Стартуємо сервер
http.createServer(app).listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});
