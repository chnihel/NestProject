/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
@Schema()
export class SoldePoint {
  @Prop()
  points: number;
  @Prop()
  montant: number;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  clientId: Types.ObjectId;
}

export const SoldePointSchema = SchemaFactory.createForClass(SoldePoint);
