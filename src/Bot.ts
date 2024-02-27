import TelegramBot from "node-telegram-bot-api";
import commands from "./libs/commands";
import { ReplyWithButton, UserData } from "./libs/types";
import { guideText } from "./libs/constants";

class Bot extends TelegramBot {
  constructor(token, botOptions) {
    super(token, botOptions);
    // on message
    this.on("message", (data) => {
      const {
        from: { id },
      } = data;

      const isInCommand: boolean = Object.values(commands).some(
        (keyword: RegExp) => keyword.test(data.text)
      );

      if (!isInCommand) {
        const result: string =
          "Saya tidak mengerti 🙏\nketik !help atau klik tombol dibawah ini untuk memunculkan panduan";

        this.sendMessage(
          id,
          result,
          replyWithButton({
            text: "Panduan Penggunaan",
            callback_data: "go_to_help",
          })
        );
      }
    });
    // on callback query
    this.on("callback_query", (callback: UserData): void => {
      const {
        data,
        from: { id },
      } = callback;
      if (data == "go_to_help") {
        this.sendMessage(id, guideText);
      }
    });
  }
}

const replyWithButton = ({ text, callback_data }: ReplyWithButton) => {
  return {
    reply_markup: {
      inline_keyboard: [[{ text, callback_data }]],
    },
  };
};
