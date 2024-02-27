require("dotenv").config();

import Bot from "./src/Bot";
// initialize type bot options
type BotOptions = {
  polling: boolean;
  filePath?: boolean;
};

// initialize token
const token: string | undefined = process.env.TOKEN;
const BotOptions: BotOptions = { polling: true, filePath: false };

// initialze bot command
const bot = new Bot(token, BotOptions);

function main(): void {
  bot.showGreeting();
  bot.showHelp();
  bot.showHaditsList();
  bot.showHaditsToday();
}

console.log("Telegram Bot is Running Now");

main();
