/* eslint-disable prettier/prettier */

import { Document, Types } from "mongoose";
export interface IClient extends Document {
  readonly prenom: string;
  readonly dateNaissance: string;
  readonly adresse: string;
  readonly soldes: number;
  readonly classement: string;
  readonly numeroTel: string;
  readonly item: string;

  soldePointId : Types.ObjectId []
  readonly entrepriseId : Types.ObjectId []


}
