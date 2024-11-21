/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/user/entities/user.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "user",
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
