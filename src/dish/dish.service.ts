import { Injectable } from '@nestjs/common/decorators';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import mongoose from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { FilesService } from 'src/files/files.service';
import { DishModel } from './dish.model';
import { CreateDishDto } from './dto/create-dish.dto';
import { FindDishDto } from './dto/find-dish.dto';

@Injectable()
export class DishService {
  constructor(
    @InjectModel(DishModel)
    private readonly dishModel: ModelType<DishModel>,
    private readonly fileService: FilesService,
  ) {}

  async create(dto: CreateDishDto): Promise<DocumentType<DishModel>> {
    let photo;
    if (dto?.photo) {
      const image = await this.fileService.saveFiles([dto.photo]);
      photo = image[0];
    }
    return this.dishModel.create({
      ...dto,
      photo,
    });
  }

  async findById(id: string) {
    return this.dishModel.findById(id).exec();
  }

  async updateById(id: string, dto: CreateDishDto) {
    return this.dishModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findWithMenu(dto: FindDishDto) {
    return this.dishModel
      .aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(dto.id),
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: dto.limit,
        },
        {
          $lookup: {
            from: 'Menu',
            localField: '_id',
            foreignField: 'restaurantId',
            as: 'menu',
            pipeline: [{ $project: { name: 1 } }],
          },
        },

        {
          $addFields: {
            menuCount: { $size: '$menu' },
          },
        },
        {
          $project: {
            name: 1,
            menu: 1,
          },
        },
      ])
      .exec();
  }
}
