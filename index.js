import { Client, Intents } from "discord.js";
import dotenv from "dotenv";
import moment from "moment";
import cron from "node-cron";
moment.locale("tr");
dotenv.config();
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
var now = moment(); //todays date
var end = moment(new Date("05/14/2022 14:05")); // another date
var duration = moment.duration(now.diff(end));
var days = duration.asDays();
var hour = new Date().getHours() - new Date("05/14/2022").getHours();
var minute = new Date().getMinutes() - new Date("05/14/2022").getMinutes();
var second = new Date().getSeconds() - new Date("05/14/2022").getSeconds();
client.on("message", async (message) => {
  if (message.author.bot) return false;
  const authorMessage = message.content.toLowerCase().trim();

  if (authorMessage === "!sayac")
    await message.reply(
      `Mehmet Kardeşimizin Askerden Dönmesine ${Math.abs(
        Math.floor(days).toFixed(2)
      )} Gün, ${hour} Saat, ${minute} Dakika, ${second} Saniye kaldı!
        `
    );
});

client.on("ready", async (message) => {
  cron.schedule("0 0 * * *", async function () {
    await message.channels.cache
      .get("541651510761750558")
      .send(
        `@everyone Mehmet Kardeşimizin Askerden Dönmesine ${Math.abs(
          Math.floor(days).toFixed(2)
        )} Gün, ${hour} Saat, ${minute} Dakika, ${second} Saniye kaldı!`
      );
  });
});

client.login(process.env.DISCORD_BOT_TOKEN);
