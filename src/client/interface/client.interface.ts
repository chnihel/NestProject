/* eslint-disable prettier/prettier */

import { Document, Types } from "mongoose";
import { IUser } from "src/user/interface/user.interface";
export interface IClient extends IUser {
  readonly prenom: string;
  readonly dateNaissance: string;
  readonly adresse: string;
/*   readonly soldes: number; */
  readonly classement: string;
  readonly numeroTel: string;
  readonly item: string;
  panierId : Types.ObjectId []
  soldePointId : Types.ObjectId []
  readonly entrepriseId : Types.ObjectId []


}
