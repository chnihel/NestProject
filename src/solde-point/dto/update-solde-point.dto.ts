/* eslint-disable prettier/prettier */

import { PartialType } from "@nestjs/mapped-types";
import { CreateSoldePointDto } from "./create-solde-point.dto";

export class UpdateSoldePointDto extends PartialType(CreateSoldePointDto) {}
