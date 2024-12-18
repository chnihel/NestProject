/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
@Schema()
export class Cart {
@Prop()
  publicationId: string;
  @Prop()
  titre: string;
@Prop()
quantite : number ;
@Prop()
prix: number ;
@Prop()
entrepriseId: string ;

}
export const CartSchema = SchemaFactory.createForClass(Cart)

@Schema({timestamps:true})
export class Panier extends Document {

@Prop({type:[CartSchema] , default:[]})
  cart: Cart[];
@Prop({default:0})
prixtotal : number ;
@Prop({default:"en cours"})
status: string ;

@Prop({type:SchemaTypes.ObjectId , ref :"user" })
clientId : Types.ObjectId

@Prop([{type:SchemaTypes.ObjectId , ref :"publication" }])
publicationId : Types.ObjectId[];


}
export const PanierSchema = SchemaFactory.createForClass(Panier)
