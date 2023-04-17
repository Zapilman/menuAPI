export class CreateRestaurantDto {
  name: string;
  number: string;
  address: string;
  workingHours: string;
  deliveryNumber?: string;
  photo: Express.Multer.File;
}
