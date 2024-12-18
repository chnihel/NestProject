/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEntrepriseDto } from "./dto/create-entreprise.dto";
import { InjectModel } from "@nestjs/mongoose";
import { IEntreprise } from "./interface/entreprise.interface";
import { Model } from "mongoose";
import { UpdateEntrepriseDto } from "./dto/update-entreprise.dto";
import * as argon2 from "argon2";
import { MailerService } from '@nestjs-modules/mailer';  
import * as crypto from 'crypto';


@Injectable()
export class EntrepriseService {
  constructor(
    @InjectModel("user") private EntrepriseModel: Model<IEntreprise>,
      private mailerService : MailerService ,
  ) {}
      hashData(data: string) {
    return argon2.hash(data);
  }
    // fonction pour generate un code de verification d'email avec crypto
  async generateCode() : Promise <string> {
    return crypto.randomBytes(3).toString('hex').toUpperCase();

    }
  async createEntreprise(
    createEntrepriseDto: CreateEntrepriseDto,
  ): Promise<IEntreprise> {
     const hashedPassword = await this.hashData(createEntrepriseDto.password);
         const code = await this.generateCode();

    
     const newEntreprise = await new this.EntrepriseModel({... createEntrepriseDto, password:hashedPassword,  code :code});
          // envoi du code de verification par email
       const mailOptions = {
      from: '"yousrbensalem@gmail.com"',
      to: createEntrepriseDto.email,
      subject: 'Vérification de votre adresse email',
      text: `Votre code de vérification est : ${code}`,
      html: `<p>Votre code de vérification est : <strong><a href=http://localhost:3000/user/verify/${code}>${code}</a></strong></p>`,
    };
      await this.mailerService.sendMail(mailOptions); 
    //const newEntreprise = await new this.EntrepriseModel(createEntrepriseDto);
    return newEntreprise.save();
  }

  async UpdateEntreprise(
    entrepriseId: string,
    updateEntrepriseDto: UpdateEntrepriseDto,
  ): Promise<IEntreprise> {
    const existingEntreprise = await this.EntrepriseModel.findOneAndUpdate(
      {_id:entrepriseId,item:'entreprise'},
      updateEntrepriseDto,
      { new: true },
    );
    if (!existingEntreprise) {
      throw new NotFoundException(`Entreprise #${entrepriseId} not found`);
    }
    return existingEntreprise;
  }

  // function to update status of entreprise 
  async updateStatus(
    entrepriseId: string,
    ): Promise<IEntreprise> {
    /*   const existingEntreprise = await this.EntrepriseModel.findById(
        {_id:entrepriseId,item:'entreprise'},
        {status},
        { new: true },
        ); */
        /*   const existingEntreprise = await this.EntrepriseModel.findById(
        entrepriseId); */
        const existingEntreprise = await this.EntrepriseModel.findOneAndUpdate(
          {_id:entrepriseId,item:'entreprise'} , {$set : {status :"Acceptable"}}, { new: true },);
        if (!existingEntreprise) {
          throw new NotFoundException(`Entreprise #${entrepriseId} not found`);
          }
          const updateEntreprise = await existingEntreprise.save()
          return updateEntreprise;
          
          }

  async getAllEntreprises(): Promise<IEntreprise[]> {
    const entrepriseData = await this.EntrepriseModel.find({
      item: "entreprise",
    }).populate('publication');
    if (!entrepriseData || entrepriseData.length == 0) {
      throw new NotFoundException("entreprise data not found!");
    }
    return entrepriseData;
  }

  async getEntreprise(entrepriseId: string): Promise<IEntreprise> {
    const existingEntreprise =
      await this.EntrepriseModel.findById(entrepriseId).populate('publication');;
    if (!existingEntreprise) {
      throw new NotFoundException(`Entreprise #${entrepriseId} not found`);
    }
    return existingEntreprise;
  }

  async deleteEntreprise(entrepriseId: string): Promise<IEntreprise> {
    const deletedEntreprise =
      await this.EntrepriseModel.findByIdAndDelete(entrepriseId);
    if (!deletedEntreprise) {
      throw new NotFoundException(`Entreprise #${entrepriseId} not found`);
    }
    return deletedEntreprise;
  }

}
