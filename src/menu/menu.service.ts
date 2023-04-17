import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuModel } from './menu.model';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(MenuModel)
    private readonly menuModel: ModelType<MenuModel>,
  ) {}

  create(createMenuDto: CreateMenuDto) {
    return this.menuModel.create(createMenuDto);
  }

  findAll() {
    return this.menuModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
