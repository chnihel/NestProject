/* eslint-disable prettier/prettier */

import { Document, Types } from "mongoose";
export interface IEntreprise extends Document {
   logo: string;
  readonly numero: string;
  readonly siteweb: string;
  readonly responsable: string;
  readonly description: string;
  readonly archive: string;
  readonly item: string;
   publication : Types.ObjectId []
     clientId : Types.ObjectId []


}
