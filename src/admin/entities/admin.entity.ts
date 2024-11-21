/* eslint-disable prettier/prettier */

import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";

@Schema()
export class Admin extends User {
  item: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
