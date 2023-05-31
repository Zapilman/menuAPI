import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf, Scenes } from 'telegraf';

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Scenes.SceneContext>,
  ) {}

  async sendMessage(message: string) {
    return this.bot.telegram.sendMessage('566875359', message);
  }
}
