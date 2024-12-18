/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { PanierService } from './panier.service';
import { PanierController } from './panier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PanierSchema } from './entities/panier.entity';
import { UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[
        MongooseModule.forFeature([
      {
        name: "panier",
        schema:PanierSchema
      },
        {
        name: "user",
        schema:UserSchema
      }
    ]),
  ],
  controllers: [PanierController],
  providers: [PanierService],
})
export class PanierModule {}
