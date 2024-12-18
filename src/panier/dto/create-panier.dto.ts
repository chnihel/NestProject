/* eslint-disable prettier/prettier */

import { Type } from "class-transformer";
import {  IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";
export class CreateCartDto {
  @IsString()
readonly  publicationId: string;
@IsString()
readonly titre:string
  @IsNumber()
  @Type(()=>Number)
readonly quantite : number ;
  @IsNumber()
  @Type(()=>Number)
readonly prix: number ;
  @IsString()

readonly entrepriseId: string ;
}

export class CreatePanierDto {
readonly  cart: CreateCartDto[];
  @IsNumber()
  @Type(()=>Number)
readonly prixtotal : number ;
 status: string ;

readonly clientId: Types.ObjectId ;

}
