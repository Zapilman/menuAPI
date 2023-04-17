import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

class Dish {
  @prop()
  name: string;

  @prop()
  price: number;

  @prop()
  description: string;

  @prop()
  weight: string;

  @prop()
  photo: string;
}

export class Category {
  @prop()
  name: string;

  @prop({ type: () => [Dish] })
  dishes: Dish[];
}

export interface MenuModel extends Base {}
export class MenuModel extends TimeStamps {
  @prop()
  name: string;

  @prop({ type: () => [Category] })
  categories: Category[];

  @prop()
  restaurantId: Types.ObjectId;
}
