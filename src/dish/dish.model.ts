import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface DishModel extends Base {}
export class DishModel extends TimeStamps {
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

  @prop()
  categoryId: string;
}
