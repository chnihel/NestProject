/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
@Schema()
export class Publication extends Document {
  
  @Prop()
  titre: string;
  @Prop()
  description: string;
  @Prop()
  date: string;
  @Prop()
  image: string[];
  @Prop()
  prix: number;
  @Prop()
  promotion: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  entreprise: Types.ObjectId;
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);
