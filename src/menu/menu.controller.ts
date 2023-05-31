import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Category } from './menu.model';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Patch('addCategory/:id')
  async addCategory(
    @Param('id') id: string,
    @Body() updateDto: { categories: Category[] },
  ) {
    const updatedProduct = await this.menuService.addCategory(
      id,
      updateDto.categories,
    );
    if (!updatedProduct) {
      throw new NotFoundException('Menu_NOT_FOUND_ERROR');
    }
    return updatedProduct;
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    const updatedProduct = await this.menuService.updateById(id, updateMenuDto);
    if (!updatedProduct) {
      throw new NotFoundException('Menu_NOT_FOUND_ERROR');
    }
    return updatedProduct;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
