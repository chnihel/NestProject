/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { PublicationService } from "./publication.service";
import { PublicationController } from "./publication.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { PublicationSchema } from "./entities/publication.entity";
import { UserSchema } from "src/user/entities/user.entity";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
      MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forFeature([
      {
        name: "publication",
        schema: PublicationSchema,
      },
      {
        name: "user",
        schema:UserSchema
      }
    ]),
  ],
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}
