export class CreateDishDto {
  name: string;
  price: number;
  description: string;
  weight?: string;
  photo?: Express.Multer.File;
  categoryId: string;
}
