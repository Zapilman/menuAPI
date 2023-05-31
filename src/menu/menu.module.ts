import { Module, forwardRef } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuModel } from './menu.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { DishModule } from 'src/dish/dish.module';

@Module({
  controllers: [MenuController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MenuModel,
        schemaOptions: { collection: 'Menu' },
      },
    ]),
    forwardRef(() => DishModule)
  ],
  providers: [MenuService],
  exports: [MenuService]
})
export class MenuModule {}
