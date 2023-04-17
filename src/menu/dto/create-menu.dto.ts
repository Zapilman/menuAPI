import { Category } from '../menu.model';

export class CreateMenuDto {
  name: string;

  categories: Category[];

  restaurantId: string;
}
