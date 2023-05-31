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

// const getMongoString = (configService: ConfigService) =>
//   'mongodb://127.0.0.1:27017';

const getMongoString = (configService: ConfigService) =>
  'mongodb+srv://admin:admin@cluster0.t8s5oxw.mongodb.net/menu';

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
