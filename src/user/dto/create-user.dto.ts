/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateUserDto {
    @ApiProperty({type:'string', description:'name'})

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()

  readonly name: string;
  @ApiProperty({type:'string', description:'username'})

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;
  @ApiProperty({type:'string', description:'email'})

  @IsString()
  @MaxLength(30)
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

     code : string ;
    verify : boolean ;

  @ApiProperty({type:'string', description:'password'})

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
   password: string;
     refreshToken: string;

}
