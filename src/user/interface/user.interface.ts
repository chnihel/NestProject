/* eslint-disable prettier/prettier */

import { Document } from "mongoose";
export interface IUser extends Document {
  readonly name: string;
  readonly username: string;
  readonly email: string;
   password: string;
     refreshToken: string;

      code : string ;
    verify : boolean ;

}
