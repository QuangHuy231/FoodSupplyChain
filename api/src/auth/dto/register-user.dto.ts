import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  UserName: string;
  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  UserType: string;

  @IsNotEmpty()
  Address: string;

  @IsNotEmpty()
  Password: string;
}
