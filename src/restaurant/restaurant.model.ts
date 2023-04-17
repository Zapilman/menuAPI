import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { TPhoto } from 'src/types/Photo.type';

export interface RestaurantModel extends Base {}
export class RestaurantModel extends TimeStamps {
  @prop()
  name: string;

  @prop()
  phoneNumber: string;

  @prop()
  address: string;

  @prop()
  workingHours: string;

  @prop()
  photo: TPhoto;

  @prop()
  description: string;

  @prop()
  deliveryNumber?: string;
}
