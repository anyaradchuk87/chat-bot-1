const bot = require("./bot");

module.exports = async (req, res) => {
  try {
    const body = req.body;

    if (body && body.message) {
      bot.processUpdate(body);
    }

    res.status(200).send("Бот отримав оновлення!");
  } catch (error) {
    console.error("Помилка:", error);
    res.status(500).send("Щось пішло не так...");
  }
};
