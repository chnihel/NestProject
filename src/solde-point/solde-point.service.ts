/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSoldePointDto } from "./dto/create-solde-point.dto";

import { ISoldePoint } from "./interface/solde-point.interface";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { UpdateSoldePointDto } from "./dto/update-solde-point.dto";
import { IClient } from "src/client/interface/client.interface";

@Injectable()
export class SoldePointService {
  constructor(
    @InjectModel("SoldePoint") private soldePointModel: Model<ISoldePoint>,
      @InjectModel ("user") private clientModel : Model<IClient>
  ) {}

  async createSoldePoint(
    createSoldePointDto: CreateSoldePointDto,
  ): Promise<ISoldePoint> {
    const newSoldePoint = await new this.soldePointModel(createSoldePointDto);
    /* await this.clientModel.updateOne({_id:createSoldePointDto.clientId},{$push :{soldePoint:newSoldePoint._id}})  */
    const SavedSoldePoint = await newSoldePoint.save() as ISoldePoint ;
    const clientId = await this.clientModel.findById(createSoldePointDto.clientId);
    if( clientId){
      clientId.soldePointId.push(SavedSoldePoint._id  as mongoose.Types.ObjectId)
      const savedClient = await clientId.save()
      console.log(savedClient)
    }else{
      console.log("client not found")
    }
    return SavedSoldePoint;
  }

  async UpdateSoldePoint(
    soldeId: string,
    updateSoldeDto: UpdateSoldePointDto,
  ): Promise<ISoldePoint> {
    const existingSoldePoint = await this.soldePointModel.findByIdAndUpdate(
      soldeId,
      updateSoldeDto,
      { new: true },
    );
    if (!existingSoldePoint) {
      throw new NotFoundException(`Solde Point #${soldeId} not found`);
    }
    return existingSoldePoint;
  }

  async getAllSoldePoint(): Promise<ISoldePoint[]> {
    const soldePointData = await this.soldePointModel.find();
    if (!soldePointData || soldePointData.length == 0) {
      throw new NotFoundException("solide point data not found!");
    }
    return soldePointData;
  }

  async getSolidePoint(solidePointId: string): Promise<ISoldePoint> {
    const existingsolidePoint = await this.soldePointModel
      .findById(solidePointId)
      .exec();
    if (!existingsolidePoint) {
      throw new NotFoundException(`solide point #${solidePointId} not found`);
    }
    return existingsolidePoint;
  }

  async deleteSolidePoint(solidePointId: string): Promise<ISoldePoint> {
    const deletedSolidePoint =
      await this.soldePointModel.findByIdAndDelete(solidePointId);
    if (!deletedSolidePoint) {
      throw new NotFoundException(`Solide point #${solidePointId} not found`);
    }

    const updatedClient = await this.clientModel.findById(deletedSolidePoint.clientId);
    if(updatedClient){
      updatedClient.soldePointId = updatedClient.soldePointId.filter(soldId => soldId.toString() !== solidePointId )
      await updatedClient.save();
    }else {
      throw new NotFoundException(`solde point #${solidePointId} not found in the client`);
    }
    return deletedSolidePoint;
  }
  /*   findAll() {
    return `This action returns all soldePoint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} soldePoint`;
  }

  update(id: number, updateSoldePointDto: UpdateSoldePointDto) {
    return `This action updates a #${id} soldePoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} soldePoint`;
  } */
}
