// api/bot.js
import bot from "../bot"; // Імпортуємо екземпляр бота

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString(); // Додаємо отриманий кусок даних
      });

      req.on("end", () => {
        if (body) {
          const update = JSON.parse(body);
          console.log("📩 Отримано оновлення:", update.message);

          if (update.message) {
            bot.processUpdate(update); // Обробляємо отримані оновлення
          }
        }

        res.status(200).send("✅ Бот отримав оновлення!"); // Відповідь після обробки
      });
    } else if (req.method === "GET") {
      // Якщо GET запит
      res.status(200).send("👋 Привіт! Це сервер твого Telegram бота 🚀"); // Відповідь на GET запит
    } else {
      res.status(405).send("❌ Метод не дозволений"); // Якщо інший метод
    }
  } catch (error) {
    console.error("❌ Помилка:", error);
    res.status(500).send("Щось пішло не так..."); // Відповідь у випадку помилки
  }
};
