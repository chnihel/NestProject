/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from "src/user/dto/create-user.dto";
export class CreateAdminDto extends CreateUserDto {
  @ApiProperty({type:'string', description:'admin'})
  readonly item: string;
}
