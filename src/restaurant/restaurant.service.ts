import { Injectable } from '@nestjs/common/decorators';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import mongoose from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { FilesService } from 'src/files/files.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { FindRestaurantDto } from './dto/find-restaurant.dto';
import { RestaurantModel } from './restaurant.model';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(RestaurantModel)
    private readonly restaurantModel: ModelType<RestaurantModel>,
    private readonly fileService: FilesService,
  ) {}

  async create(
    dto: CreateRestaurantDto,
  ): Promise<DocumentType<RestaurantModel>> {
    const image = await this.fileService.saveFiles([dto.photo]);
    return this.restaurantModel.create({ ...dto, photo: image[0] });
  }

  async findById(id: string) {
    return this.restaurantModel.findById(id).exec();
  }

  async updateById(id: string, dto: CreateRestaurantDto) {
    return this.restaurantModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  async findWithMenu(dto: FindRestaurantDto) {
    return this.restaurantModel
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
