/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { InjectModel } from "@nestjs/mongoose";
import { IClient } from "./interface/client.interface";
import * as argon2 from 'argon2';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';  
import mongoose, { Model } from "mongoose";
import { IEntreprise } from "src/entreprise/interface/entreprise.interface";

@Injectable()
export class ClientService {
  constructor(@InjectModel("user") private clientModel: Model<IClient>,
  @InjectModel("user") private entrepriseModel: Model<IEntreprise> ,
    private mailerService : MailerService ,
) {}

    hashData(data: string) {
    return argon2.hash(data);
  }

  // fonction pour generate un code de verification d'email avec crypto
  async generateCode() : Promise <string> {
    return crypto.randomBytes(3).toString('hex').toUpperCase();

    }
  

  async createClient(createClientDto: CreateClientDto): Promise<IClient> {
   const hashedPassword = await this.hashData(createClientDto.password);
    const code = await this.generateCode();
   
     const newClient = await new this.clientModel({... createClientDto, password:hashedPassword , code :code});  

     // envoi du code de verification par email
       const mailOptions = {
      from: '"yousrbensalem@gmail.com"',
      to: createClientDto.email,
      subject: 'Vérification de votre adresse email',
      text: `Votre code de vérification est : ${code}`,
      html: `<p>Votre code de vérification est : <strong><a href=http://localhost:3000/user/verify/${code}>${code}</a></strong></p>`,
    };
      await this.mailerService.sendMail(mailOptions);

  //const newClient = await new this.clientModel( createClientDto);

    const savedClient = await newClient.save( )  as IClient;
    const entrepriseId = await this.entrepriseModel.findById(createClientDto.entrepriseId);
    if (entrepriseId) {
        entrepriseId.clientId.push(savedClient._id as mongoose.Types.ObjectId);
        const savedEntreprise = await entrepriseId.save()
        console.log(savedEntreprise)
    }else {
        console.log("Entreprise not found")

    }
    return savedClient ;
  }


  async UpdateClient(
    clientId: string,
    updateClientDto: UpdateClientDto,
  ): Promise<IClient> {
    const existingClient = await this.clientModel.findOneAndUpdate(
      {_id:clientId, item:"client"},
      updateClientDto,
      { new: true },
    );
    if (!existingClient) {
      throw new NotFoundException(`Client #${clientId} not found`);
    }
    return existingClient;
  }

  async getAllClients(): Promise<IClient[]> {
    const clientData = await this.clientModel.find({ item: "client" });
    if (!clientData || clientData.length == 0) {
      throw new NotFoundException("Clients data not found!");
    }
    return clientData;
  }

  async getClient(clientId: string): Promise<IClient> {
    const existingClient = await this.clientModel.findById(clientId).populate("panierId");
    if (!existingClient) {
      throw new NotFoundException(`Client #${clientId} not found`);
    }
    return existingClient;
  }
  async deleteClient(clientId: string): Promise<IClient> {
    const deletedClient = await this.clientModel.findByIdAndDelete(clientId);
    if (!deletedClient) {
      throw new NotFoundException(`Client #${clientId} not found`);
    }
    const updatedEntrprise = await this.entrepriseModel.findById(deletedClient.entrepriseId);
    if(updatedEntrprise){
  updatedEntrprise.clientId = updatedEntrprise.clientId.filter(cliId => cliId.toString()!== clientId);
    await updatedEntrprise.save();
    }else{
    throw new NotFoundException(`client #${clientId} not found in the entreprise`);
}

    
    return deletedClient;
  }
}
