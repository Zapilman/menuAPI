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
  constructor(private readonly dishService: DishService) {}

  @UseInterceptors(FileInterceptor('photo'))
  @Post()
  async create(
    @Body() dto: CreateDishDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.dishService.create({ ...dto, photo: file });
  }

}
