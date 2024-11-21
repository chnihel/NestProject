/* eslint-disable prettier/prettier */

import { Document } from "mongoose";
export interface IAdmin extends Document {
  readonly item: string;
}
