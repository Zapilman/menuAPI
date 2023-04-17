import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  console.log(getMongoString(configService));
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

const getMongoString = (configService: ConfigService) =>
  'mongodb://' +
  configService.get('MONGO_HOST') +
  ':' +
  configService.get('MONGO_PORT') +
  '/menu';

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
