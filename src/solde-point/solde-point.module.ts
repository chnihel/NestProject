/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { SoldePointService } from "./solde-point.service";
import { SoldePointController } from "./solde-point.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { SoldePointSchema } from "./entities/solde-point.entity";
import { UserSchema } from "src/user/entities/user.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "SoldePoint",
        schema: SoldePointSchema,
      },
        {
        name: "user",
        schema:UserSchema
      } 
    ]),
  ],
  controllers: [SoldePointController],
  providers: [SoldePointService],
})
export class SoldePointModule {}
