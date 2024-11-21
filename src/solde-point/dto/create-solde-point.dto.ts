/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {  IsNumber } from "class-validator";
import { Types } from "mongoose";

export class CreateSoldePointDto {
  @ApiProperty({type:'number' , description:'nombre de point' })
  @IsNumber()
  @Type(()=>Number)

  readonly points: number;
  @ApiProperty({type:'number' , description:'le montant ' })
  @IsNumber()
  @Type(()=>Number)

  readonly montant: number;

  readonly clientId: Types.ObjectId;

}
