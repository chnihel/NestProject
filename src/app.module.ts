/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PublicationModule } from "./publication/publication.module";
import { SoldePointModule } from "./solde-point/solde-point.module";
import { UserModule } from "./user/user.module";
import { AdminModule } from "./admin/admin.module";
import { ClientModule } from "./client/client.module";
import { EntrepriseModule } from "./entreprise/entreprise.module";
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { PanierModule } from './panier/panier.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017", {
      dbName: "project",
    }),
    PublicationModule,
    SoldePointModule,
    UserModule,
    AdminModule,
    ClientModule,
    EntrepriseModule,
    AuthModule,
    ConfigModule.forRoot({isGlobal:true}),
    PanierModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
