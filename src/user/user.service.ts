/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import * as argon2 from 'argon2';

import { Model } from "mongoose";
import { IUser } from "./interface/user.interface";
import { HachagePasswordDto } from './dto/hachage-password.dto';
import { join } from "path";


@Injectable()
export class UserService {
    constructor(@InjectModel('user') private userModel: Model<IUser>) {}

  
    hashData(data: string) {
    return argon2.hash(data);
  }

  
async hachPassword( userId: string,hachagePasswordDto: HachagePasswordDto): Promise<void> {
    const { oldPassword, newPassword } = hachagePasswordDto;
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
    const existingUser = await this.userModel.findById(userId);
    if (!existingUser) {
      console.log('Error: Old password is incorrect');
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await argon2.verify(existingUser.password, oldPassword);
    if (!isPasswordValid) {
      throw new NotFoundException('Password is incorrect');
    }
    const hashedNewPassword = await argon2.hash(newPassword);
    console.log('Hashed New Password:', hashedNewPassword);
    existingUser.password = hashedNewPassword;
    await existingUser.save();
    console.log('Password updated successfully');
  }
  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<IUser> {
    return this.userModel.findById(id);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }
    async findByUsername(email: string): Promise<IUser> {
    return this.userModel.findOne({ email }).exec();
  }

 async remove(id: string): Promise<IUser> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
 // fonction verification de code par email 
 async VerificationCode(code: string, res :any): Promise<void> {
  try {
      const ExistiongCode = await this.userModel.findOne({ code})
  if (!ExistiongCode) {

      return res.sendFile(join(__dirname+'../../../verifyEmail/error.html'))
    // navigate to html page error.html
    
  }

        ExistiongCode.code=undefined;
        ExistiongCode.verify=true
        await ExistiongCode.save()
        return res.sendFile(join(__dirname+'../../../verifyEmail/correct.html'))
    
  } catch (error) {
    return error ;
    
  }




 }


 // forget password
  async findByEmail (email : string):Promise<IUser>{
    return this.userModel.findOne({email}).exec();
  } 

  async updateToken (id: any , token : string) {
    const user = await this.userModel.findByIdAndUpdate(id ,{refreshToken :token} , {$new : true} );
    if (!user) {
      throw new NotFoundException('User not found');
      }
    return user
      
        
  }
  async findUserByNameOrEmail (query: { email?: string; name?: string }): Promise<IUser> {
    
    return this.userModel.findOne({
      $or: [{ email: query.email }, { name: query.name }],
    });
  }
  
  async findUserByNameAndEmail(query: { email: string; name: string }): Promise<IUser>{
  return await this.userModel.findOne({
    $and: [
      {  name: query.name },
      {email: query.email  },
    ],
  }).exec();
}

}
