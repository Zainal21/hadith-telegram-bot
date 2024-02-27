import TelegramBot, { SendMessageOptions } from "node-telegram-bot-api";
import commands from "./libs/commands";
import {
  HadithBaseContentResponse,
  HadithBookResponse,
  ReplyWithButton,
  UserData,
} from "./libs/types";
import { guideText } from "./libs/constants";

export default class Bot extends TelegramBot {
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
  showHelp(): void {
    this.onText(commands.help, (data: UserData) => {
      const {
        from: { id },
      } = data;
      this.sendMessage(id, guideText);
    });
  }
  showGreeting(): void {
    this.onText(commands.greeting, (data: UserData) => {
      const {
        from: { id },
      } = data;
      this.sendMessage(id, `halo! 😁`);
    });
  }
  showHaditsList(): void {
    this.onText(commands.haditsLists, async (data): Promise<void> => {
      const {
        from: { id },
      } = data;
      this.sendMessage(id, "Mohon Tunggu sebentar, Data sedang di proses...");

      try {
        const opts: SendMessageOptions = {
          parse_mode: "Markdown",
        };

        const response = await fetch(`${process.env.HADITH_ENDPOINT}/books`);

        const { data }: HadithBookResponse = await response.json();

        let responseMessage = `Daftar Hadits\n`;
        data.forEach((data) => {
          responseMessage += `📖 Hadits Riwayat **${data.name}**, Jumlah Halaman **${data.available}** \n`;
        });
        this.sendMessage(id, responseMessage, opts);
      } catch (error) {
        console.error(error);
        this.sendMessage(id, "Terjadi kesalahan saat mengambil data");
      }
    });
  }
  showHaditsToday(): void {
    this.onText(commands.haditsToday, async (data): Promise<void> => {
      const {
        from: { id },
      } = data;
      this.sendMessage(id, "Mohon Tunggu sebentar, Data sedang di proses...");

      try {
        const opts: SendMessageOptions = {
          parse_mode: "Markdown",
        };

        const responseBooks = await fetch(
          `${process.env.HADITH_ENDPOINT}/books`
        );

        const { data }: HadithBookResponse = await responseBooks.json();

        const author = data[Math.floor(Math.random() * data.length)];
        const randomBookNumber = Math.floor(Math.random() * 10) + 1;

        const responseHaditsContent = await fetch(
          `${process.env.HADITH_ENDPOINT}/books/${author.id}/${randomBookNumber}`
        );

        const response: HadithBaseContentResponse =
          await responseHaditsContent.json();

        let responseMessage = `📖 Hadits Riwayat ${author.name} Halaman ${randomBookNumber}\n`;
        responseMessage += `\n **${response.data.contents.arab}**, \n Artinya : **${response.data.contents.id}** \n`;
        this.sendMessage(id, responseMessage, opts);
      } catch (error) {
        console.error(error);
        this.sendMessage(id, "Terjadi kesalahan saat mengambil data");
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
