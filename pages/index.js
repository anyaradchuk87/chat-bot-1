import bot from "../pages/bot";

const bot = require("./bot");

module.exports = async (req, res) => {
  try {
    if (req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        if (body) {
          const update = JSON.parse(body);

          if (update.message) {
            console.log("📩 Отримано повідомлення:", update.message);
            bot.processUpdate(update);
          }
        }

        res.status(200).send("✅ Бот отримав оновлення!");
      });
    } else if (req.method === "GET") {
      res.status(200).send("👋 Привіт! Це сервер твого Telegram бота 🚀");
    } else {
      res.status(405).send("❌ Метод не дозволений");
    }
  } catch (error) {
    console.error("❌ Помилка:", error);
    res.status(500).send("Щось пішло не так...");
  }
};
