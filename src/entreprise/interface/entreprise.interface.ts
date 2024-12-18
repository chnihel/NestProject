/* eslint-disable prettier/prettier */

import { Types } from "mongoose";
import { IUser } from "src/user/interface/user.interface";
export interface IEntreprise extends IUser {
   logo: string;
  readonly numero: string;
  readonly siteweb: string;
  readonly responsable: string;
  readonly description: string;
  readonly archive: string;
  readonly item: string;
     status: string;

   publication : Types.ObjectId []
     clientId : Types.ObjectId []


}
