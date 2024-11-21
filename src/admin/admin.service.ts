/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/mongoose";
import { IAdmin } from "./interface/admin.interface";
import * as crypto from 'crypto';

import { Model } from "mongoose";
import * as argon2 from "argon2";
import { MailerService } from '@nestjs-modules/mailer';  

@Injectable()
export class AdminService {
  constructor(@InjectModel("user") private AdminModel: Model<IAdmin> ,     private mailerService : MailerService ,
) {}

      hashData(data: string) {
    return argon2.hash(data);
  }

  // fonction pour generate un code de verification d'email avec crypto
  async generateCode() : Promise <string> {
    return crypto.randomBytes(3).toString('hex').toUpperCase();

    }
  async createAdmin(createAdminDto: CreateAdminDto): Promise<IAdmin> {
     const hashedPassword = await this.hashData(createAdminDto.password);
    
         const code = await this.generateCode();

     const newAdmin = await new this.AdminModel({... createAdminDto, password:hashedPassword,  code :code});
        // envoi du code de verification par email
       const mailOptions = {
      from: '"yousrbensalem@gmail.com"',
      to: createAdminDto.email,
      subject: 'Vérification de votre adresse email',
      text: `Votre code de vérification est : ${code}`,
      html: `<p>Votre code de vérification est : <strong><a href=http://localhost:3000/user/verify/${code}>${code}</a></strong></p>`,
    };
      await this.mailerService.sendMail(mailOptions);
 
    //const newAdmin = await new this.AdminModel(createAdminDto);
    return newAdmin.save();
  }

  async UpdateAdmin(
    adminId: string,
    updateAdminDto: UpdateAdminDto,
  ): Promise<IAdmin> {
    const existingAdmin = await this.AdminModel.findByIdAndUpdate(
      adminId,
      updateAdminDto,
      { new: true },
    );
    if (!existingAdmin) {
      throw new NotFoundException(`Admin #${adminId} not found`);
    }
    return existingAdmin;
  }

  async getAllAdmins(): Promise<IAdmin[]> {
    const adminData = await this.AdminModel.find({ item: "admin" });
    if (!adminData || adminData.length == 0) {
      throw new NotFoundException("Admins data not found!");
    }
    return adminData;
  }

  async getAdmin(adminId: string): Promise<IAdmin> {
    const existingAdmin = await this.AdminModel.findById(adminId).exec();
    if (!existingAdmin) {
      throw new NotFoundException(`Publication #${adminId} not found`);
    }
    return existingAdmin;
  }

  async deleteAdmin(adminId: string): Promise<IAdmin> {
    const deletedAdmin = await this.AdminModel.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      throw new NotFoundException(`Admin #${adminId} not found`);
    }
    return deletedAdmin;
  }
}
