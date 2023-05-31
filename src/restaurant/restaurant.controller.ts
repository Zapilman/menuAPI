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
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

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
    return restaurant?.[0] || [];
  }

  @UseInterceptors(FileInterceptor('photo'))
  @Post()
  async create(
    @Body() dto: CreateRestaurantDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.restaurantService.create({ ...dto, photo: file });
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: CreateRestaurantDto) {
    const updatedProduct = await this.restaurantService.updateById(id, dto);
    if (!updatedProduct) {
      throw new NotFoundException('PRODUCT_NOT_FOUND_ERROR');
    }
    return updatedProduct;
  }
}
