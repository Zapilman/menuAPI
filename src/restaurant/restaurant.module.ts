import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { FilesModule } from 'src/files/files.module';
import { RestaurantController } from './restaurant.controller';
import { RestaurantModel } from './restaurant.model';
import { RestaurantService } from './restaurant.service';
@Module({
  controllers: [RestaurantController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: RestaurantModel,
        schemaOptions: { collection: 'Restaurant' },
      },
    ]),
    FilesModule,
  ],
  providers: [RestaurantService],
})
export class RestaurantModule {}
