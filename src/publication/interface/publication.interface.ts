/* eslint-disable prettier/prettier */

import { Document, Types } from "mongoose";
export interface IPublication extends Document {
  readonly titre: string;
  readonly description: string;
  readonly date: string;
  image: string[];
  readonly prix: number;
  readonly promotion: number;
  readonly entreprise:Types.ObjectId;
}
