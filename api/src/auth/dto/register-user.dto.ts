import { IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  UserName: string;
  @IsNotEmpty()
  Email: string;

  @IsNotEmpty()
  UserType: string;

  @IsNotEmpty()
  Address: string;

  @IsNotEmpty()
  Password: string;
}
