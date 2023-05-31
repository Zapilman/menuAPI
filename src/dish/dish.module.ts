import { Module, forwardRef } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { FilesModule } from 'src/files/files.module';
import { DishService } from './dish.service';
import { DishModel } from './dish.model';
import { DishController } from './dish.controller';
import { MenuModule } from 'src/menu/menu.module';
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
    forwardRef(() => MenuModule),
  ],
  providers: [DishService],
  exports: [DishService],
})
export class DishModule {}
