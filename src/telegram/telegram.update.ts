import { Update, Start } from 'nestjs-telegraf';
import { TelegramService } from './telegram.service';

@Update()
export class TelegramUpdate {
  constructor(private readonly telegramService: TelegramService) {}

  @Start()
  async onStart() {
    try {
      await this.telegramService.sendMessage('Hello');
    } catch (e) {
      return e;
    }
  }
}
