import { IsNotEmpty } from 'class-validator';

export class QueryUserTypeDTO {
  @IsNotEmpty()
  userType: string;
}
