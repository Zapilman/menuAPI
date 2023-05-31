import { ConfigService } from '@nestjs/config';
import { TelegrafModuleOptions } from 'nestjs-telegraf';
import { session } from 'telegraf';

export const getTelegrafConfig = async (
  configService: ConfigService,
): Promise<TelegrafModuleOptions> => {
  const token = await configService.get('TELEGRAM_BOT_TOKEN');
  if (token === undefined) throw new Error('TELEGRAM_BOT_TOKEN is not defined');

  return {
    token: token,
    botName: 'Zapilman_Deploying',
    middlewares: [session()],
  };
};
