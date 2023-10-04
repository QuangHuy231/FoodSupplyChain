import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  productName: string;

  plantDate: string;
  harvestDate: string;
  images: string;
}
