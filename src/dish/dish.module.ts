import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { FilesModule } from 'src/files/files.module';
import { DishService } from './dish.service';
import { DishModel } from './dish.model';
import { DishController } from './dish.controller';
@Module({
  controllers: [DishController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: DishModel,
        schemaOptions: { collection: 'Restaurant' },
      },
    ]),
    FilesModule,
  ],
  providers: [DishService],
})
export class DishModule {}
