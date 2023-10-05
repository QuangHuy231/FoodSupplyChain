import { IsNotEmpty } from 'class-validator';

export class TransferProductToRetailer {
  @IsNotEmpty()
  retailerId: string;
  vehicle: string;
}
