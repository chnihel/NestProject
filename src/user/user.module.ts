/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./entities/user.entity";
import { ClientSchema } from "src/client/entities/client.entity";
import { AdminSchema } from "src/admin/entities/admin.entity";
import { EntrepriseSchema } from "src/entreprise/entities/entreprise.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "user",
        schema: UserSchema,
        discriminators: [
          { name: "client", schema: ClientSchema },
          { name: "admin", schema: AdminSchema },
          { name: "entreprise", schema: EntrepriseSchema },
        ],
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports :[UserService],
})
export class UserModule {}
