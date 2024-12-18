/* eslint-disable prettier/prettier */

import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Put,
  Param,
  Get,
  Delete,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

@ApiBody({
  schema: {
    type:'object',
    properties: {
      name: {
        type: 'string',
          },
      username: {
        type: 'string',
      
      },
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      item: {
        type: 'string',
        default:'admin'
      },
    },
  },
})
  @Post()
  async createAdmin(@Res() response, @Body() createAdminDto: CreateAdminDto) {
    try {
      const newAdmin = await this.adminService.createAdmin(createAdminDto);
      return response.status(HttpStatus.CREATED).json({
        message: "Admin has been created successfully",
        newAdmin,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "Error: Admin not created!" + err,
      });
    }
  }

@ApiBody({
  schema: {
    type:'object',
    properties: {
      name: {
        type: 'string',
          },
      username: {
        type: 'string',
      
      },
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      item: {
        type: 'string',
        default:'admin'
      },
    },
  },
})
  @Put("/:id")
  async updateAdmin(
    @Res() response,
    @Param("id") adminId: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    try {
      const existingAdmin = await this.adminService.UpdateAdmin(
        adminId,
        updateAdminDto,
      );
      return response.status(HttpStatus.OK).json({
        message: "Admin has been successfully updated",
        existingAdmin,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getAllAdmins(@Res() response) {
    try {
      const adminData = await this.adminService.getAllAdmins();
      return response.status(HttpStatus.OK).json({
        message: "All admins data found successfully",
        adminData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get("/:id")
  async getAdmin(@Res() response, @Param("id") adminId: string) {
    try {
      const existingAdmin = await this.adminService.getAdmin(adminId);
      return response.status(HttpStatus.OK).json({
        message: "Admin found successfully",
        existingAdmin,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
    
  }

  @Delete("/:id")
  async deletePublication(@Res() response, @Param("id") adminId: string) {
    try {
      const deletedAdmin = await this.adminService.deleteAdmin(adminId);
      return response.status(HttpStatus.OK).json({
        message: "Admin deleted successfully",
        deletedAdmin,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
