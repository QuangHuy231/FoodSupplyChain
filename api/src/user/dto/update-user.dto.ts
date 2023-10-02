import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  UserName: string;
  @IsNotEmpty()
  Email: string;

  @IsNotEmpty()
  UserType: string;

  @IsNotEmpty()
  Address: string;
}
