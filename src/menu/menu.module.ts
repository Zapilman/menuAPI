import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuModel } from './menu.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  controllers: [MenuController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MenuModel,
        schemaOptions: { collection: 'Menu' },
      },
    ]),
  ],
  providers: [MenuService],
})
export class MenuModule {}
