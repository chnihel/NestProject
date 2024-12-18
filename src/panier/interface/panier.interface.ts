/* eslint-disable prettier/prettier */

import { Document, Types } from "mongoose";
export interface ICart  {
readonly  publicationId: string;
readonly  titre: string;
readonly quantite : number ;
readonly prix: number ;
readonly entrepriseId: string ;
}

export interface IPanier  extends Document {
readonly  cart: ICart[];
readonly prixtotal : number ;
 status: string ;
readonly clientId: Types.ObjectId ;
}
