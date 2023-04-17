import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';

@Controller('dish')
export class DishController {
  constructor(private readonly restaurantService: DishService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.restaurantService.findById(id);
  }

  @Post(':id/menu')
  async getWithMenu(@Param('id') id: string, @Body() body: { limit: number }) {
    const restaurant = await this.restaurantService.findWithMenu({
      id,
      limit: body.limit,
    });
    return restaurant[0];
  }

  @UseInterceptors(FileInterceptor('photo'))
  @Post()
  async create(
    @Body() dto: CreateDishDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.restaurantService.create({ ...dto, photo: file });
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: CreateDishDto) {
    const updatedProduct = await this.restaurantService.updateById(id, dto);
    if (!updatedProduct) {
      throw new NotFoundException('PRODUCT_NOT_FOUND_ERROR');
    }
    return updatedProduct;
  }
}
