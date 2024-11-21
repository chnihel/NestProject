/* eslint-disable prettier/prettier */

import { Type } from "class-transformer";
import {  IsNumber, IsString, MaxLength } from "class-validator";
import { Types } from "mongoose";



export class CreatePublicationDto {
  @IsString()
  @MaxLength(30)
  readonly titre: string;

  @IsString()
  @MaxLength(100)
  readonly description: string;

  @IsString()
  readonly date: string;

   image: string[];

  @IsNumber()
  @Type(()=>Number)

  readonly prix: number;

  @IsNumber()
  @Type(()=>Number)

  readonly promotion: number;

  readonly entreprise:Types.ObjectId;

}
