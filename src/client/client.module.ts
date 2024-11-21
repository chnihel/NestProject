/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ClientService } from "./client.service";
import { ClientController } from "./client.controller";
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
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
