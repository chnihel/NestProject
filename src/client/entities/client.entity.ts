/* eslint-disable prettier/prettier */

import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "src/user/entities/user.entity";
@Schema()
export class Client extends User {
  @Prop({ required: true })
  prenom: string;

  @Prop({ required: true })
  dateNaissance: string;

  @Prop({ required: true })
  adresse: string;

/*   @Prop()
  soldes: number; */

  @Prop()
  classement: string;

  @Prop({ required: true })
  numeroTel: string;

  item: string;



  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'panier' }] })
  panierId : Types.ObjectId []

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'soldePoint' }] })
  soldePointId : Types.ObjectId []
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }] })
  entrepriseId : Types.ObjectId []
}
export const ClientSchema = SchemaFactory.createForClass(Client);
