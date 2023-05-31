import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Category, MenuModel } from './menu.model';

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

  findOne(id: string) {
    return this.menuModel.findById(id).exec();
  }

  // find(asda: any) {
  //   return this.menuModel.find({categories}).exec();
  // }

  async addCategory(id: string, category: Category[]) {
    console.log(
      '🚀 ~ file: menu.service.ts:32 ~ MenuService ~ addCategory ~ category:',
      category,
    );
    const menu = await this.findOne(id);
    if (!menu) {
      return null;
    }
    return this.menuModel
      .findByIdAndUpdate(
        id,
        { categories: [...menu.categories, ...category] },
        { new: true },
      )
      .exec();
  }

  updateById(id: string, updateMenuDto: UpdateMenuDto) {
    return this.menuModel
      .findByIdAndUpdate(id, updateMenuDto, { new: true })
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
