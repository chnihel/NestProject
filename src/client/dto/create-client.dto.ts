/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Types } from "mongoose";
import { CreateUserDto } from "src/user/dto/create-user.dto";
export class CreateClientDto extends CreateUserDto {
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  readonly prenom: string;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  readonly dateNaissance: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly adresse: string;
/* 
  @IsNumber()
  @IsNotEmpty()
  readonly soldes: number; */

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly classement: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly numeroTel: string;

  readonly item: string;


  panierId : Types.ObjectId []
   soldePointId : Types.ObjectId []
    readonly entrepriseId : Types.ObjectId []


}
