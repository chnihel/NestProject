/* eslint-disable prettier/prettier */

import {
  Controller,

  Body,
  
  Param,
  Put,
  Res,
  HttpStatus,
  Get,
  
  UseGuards,
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";

import { ApiTags } from '@nestjs/swagger';
import { HachagePasswordDto } from "./dto/hachage-password.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";

@ApiTags('user')
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}


@Put(':id')
async updatePassword(
  @Res() response,
  @Param('id') id: string,
  @Body() hachagePasswordDto: HachagePasswordDto,
) {
  try {
    await this.userService.hachPassword(id, hachagePasswordDto);
    return response.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: 'Error: User password not updated',
      error: error.message || error.toString(),
    });
  }
}
  @UseGuards(AccessTokenGuard)
  @Put('/user/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Get("verify/:code")
  async verifyCode(@Param('code') code: string ,   @Res() res,
) {
    return this.userService.VerificationCode(code , res );

  }
  @Get('findOr')
  async findOneOr(
  @Query('email') email: string,
  @Query('name') name: string,
  @Res() res,
) {
  try {
    
    const user = await this.userService.findUserByNameOrEmail({ email, name });
    return res.status(HttpStatus.OK).send({
      success: true,
      message: "L'élément est affiché",
      data: user,
    });

  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send({
      success: false,
      message: "L'élément n'est pas affiché: " + error.message,
      data: null,
    });
  }
}

  @Get('find-and')
  async findUserByNameAndEmail(
    @Query('name') name: string,
    @Query('email') email: string,
    @Res() res,

  ) {
      try {
    
    const user = await this.userService.findUserByNameAndEmail({ email, name });
    return res.status(HttpStatus.OK).send({
      success: true,
      message: "L'élément est affiché",
      data: user,
    });

  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send({
      success: false,
      message: "L'élément n'est pas affiché: " + error.message,
      data: null,
    });
  }
  }

}
