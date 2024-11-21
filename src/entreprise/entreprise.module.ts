/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { EntrepriseService } from "./entreprise.service";
import { EntrepriseController } from "./entreprise.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/user/entities/user.entity";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forFeature([
      {
        name: "user",
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [EntrepriseController],
  providers: [EntrepriseService],
})
export class EntrepriseModule {}
