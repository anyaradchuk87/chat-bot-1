// const TelegramBot = require("node-telegram-bot-api");
// const express = require("express");
// const http = require("http");
// const fs = require("fs");

// require("dotenv").config(); // Завантажуємо змінні середовища з .env

// const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// const URL = process.env.SERVER_URL;
// const bot = new TelegramBot(TOKEN, { webHook: true });
// const app = express();
// const port = process.env.PORT || 3000;

// if (!TOKEN) {
//   console.error(
//     "❌ TELEGRAM_BOT_TOKEN не знайдено! Перевірте змінні середовища."
//   );
//   process.exit(1);
// }

// bot.setWebHook(`${URL}/bot${TOKEN}`);

// http.createServer(app).listen(port, () => {
//   console.log(`HTTP сервер працює на порту ${port}`);
// });

// // Обробка маршруту на головній сторінці
// app.get("/", (req, res) => {
//   res.send("<h1>Привіт! Це твоя гра 🚀</h1><p>Додай сюди HTML+JS код гри!</p>");
// });
// app.use(express.static("public"));

// // Обробка оновлень від Telegram
// app.post(`/bot${TOKEN}`, (req, res) => {
//   bot.processUpdate(req.body);
//   res.sendStatus(200);
// });

// // Обробка команди /start
// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;

//   bot.sendMessage(chatId, "Оберіть дію:", {
//     reply_markup: {
//       inline_keyboard: [
//         [{ text: "📋 Подивитися меню", callback_data: "menu" }],
//         [{ text: "ℹ️ Пароль", callback_data: "info" }],
//         [{ text: "⏳ Таймер 30 сек", callback_data: "timer" }],
//         [
//           {
//             text: "Запустити гру",
//             web_app: {
//               url: `https://extraordinary-banoffee-f6a076.netlify.app/`,
//             },
//           },
//         ],
//       ],
//     },
//   });
// });

// // Обробка натискання кнопок
// bot.on("callback_query", (query) => {
//   const chatId = query.message.chat.id;

//   if (query.data === "menu") {
//     bot.sendMessage(chatId, "Тут буде ваше меню 🍽️");
//   } else if (query.data === "info") {
//     bot.sendMessage(chatId, "84.67.106.83");
//   } else if (query.data === "timer") {
//     bot.sendMessage(chatId, "Таймер запущено! Зачекайте 30 секунд... ⏳");
//     setTimeout(() => {
//       bot.sendMessage(chatId, "⏰ Час вийшов! 🎉");
//     }, 30000); // 30 секунд
//   }

//   bot.answerCallbackQuery(query.id); // Закриваємо запит, щоб уникнути помилок
// });

// Завантажуємо необхідні модулі
// bot.js
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
dotenv.config(); // Завантажуємо змінні середовища з .env файлу

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const URL = process.env.SERVER_URL; // Сервер URL для Webhook

// Перевіряємо наявність токену
if (!TOKEN) {
  console.error(
    "❌ TELEGRAM_BOT_TOKEN не знайдено! Перевірте змінні середовища."
  );
  process.exit(1);
}

// Створюємо екземпляр бота
const bot = new TelegramBot(TOKEN, { webHook: true });

// Налаштовуємо Webhook
bot.setWebHook(`${URL}/api/bot${TOKEN}`);

// Обробляємо команди
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привіт! Це твоя гра 🚀", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📋 Подивитися меню", callback_data: "menu" }],
        [{ text: "ℹ️ Пароль", callback_data: "info" }],
        [{ text: "⏳ Таймер 30 сек", callback_data: "timer" }],
        [
          {
            text: "Запустити гру",
            web_app: {
              url: `${URL}/game`, // Приклад URL для гри
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
    bot.sendMessage(chatId, "84.67.106.83");
  } else if (query.data === "timer") {
    bot.sendMessage(chatId, "Таймер запущено! Зачекайте 30 секунд... ⏳");
    setTimeout(() => {
      bot.sendMessage(chatId, "⏰ Час вийшов! 🎉");
    }, 30000); // 30 секунд
  }

  bot.answerCallbackQuery(query.id); // Закриваємо запит
});

module.exports = bot; // Експортуємо бота
