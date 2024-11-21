/* eslint-disable prettier/prettier */

import { Document, Types } from "mongoose";
export interface ISoldePoint extends Document {
  readonly points: number;
  readonly montant: number;
  readonly clientId: Types.ObjectId;

}
