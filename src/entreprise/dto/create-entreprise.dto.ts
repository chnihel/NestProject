/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Types } from "mongoose";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateEntrepriseDto extends CreateUserDto {
  logo: string;

  @IsString()
  @MaxLength(8)
  @IsNotEmpty()
  readonly numero: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly siteweb: string;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  readonly responsable: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly archive: string;

  readonly item: string;
  
   publication : Types.ObjectId []
   clientId : Types.ObjectId []


}
