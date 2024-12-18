/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePanierDto } from './dto/create-panier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IPanier } from './interface/panier.interface';
import mongoose, { Model } from 'mongoose';
import { IClient } from 'src/client/interface/client.interface';

@Injectable()
export class PanierService {
  constructor (
    @InjectModel ("panier") private panierModel : Model<IPanier> ,
      @InjectModel ("user") private clientModel : Model<IClient>
  ){}
  async createPanier(createPanierDto: CreatePanierDto): Promise <IPanier> {
    createPanierDto.status="acceptable";
const newPanier = await new this.panierModel(createPanierDto ) ;

const SavedPanier= await newPanier.save();
  const clientId = await this.clientModel.findById(createPanierDto.clientId);
      if( clientId){
      clientId.panierId.push(SavedPanier._id  as mongoose.Types.ObjectId)
      const savedClient = await clientId.save()
      console.log(savedClient)
    }else{
      console.log("client not found")
    }
    return SavedPanier;

}

  async getAllPanier(): Promise <IPanier[]>  {
    const panierData = await this.panierModel.find();
    if(!panierData || panierData.length==0){
      throw new NotFoundException("Panier data not found !")
    }
    return panierData ;
    }

/*   findOne(id: number) {
    return `This action returns a #${id} panier`;
  }

  update(id: number, updatePanierDto: UpdatePanierDto) {
    return `This action updates a #${id} panier`;
  }

  remove(id: number) {
    return `This action removes a #${id} panier`;
  } */
}
