require("dotenv").config();

// initialize type bot options
type BotOptions = {
  polling: boolean;
  filePath?: boolean;
};

// initialize token
const token: string | undefined = process.env.TOKEN;
const BotOptions: BotOptions = { polling: true, filePath: false };

// initialze bot command

function main(): void {
  console.log("Halo Bot Telegram");
}

console.log("Telegram Bot is Running Now");

main();
