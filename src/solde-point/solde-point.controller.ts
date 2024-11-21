/* eslint-disable prettier/prettier */

import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Put,
  Param,
  Get,
  Delete,
} from "@nestjs/common";
import { SoldePointService } from "./solde-point.service";
import { CreateSoldePointDto } from "./dto/create-solde-point.dto";
import { UpdateSoldePointDto } from "./dto/update-solde-point.dto";
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('solde-point')
@Controller("solde-point")
export class SoldePointController {
  constructor(private readonly soldePointService: SoldePointService) {}

@ApiBody({
  schema: {
    type:'object',
    properties: {
      points: {
        type: 'number',
          },
      montant: {
        type: 'number',
      
      },
      clientId: {
        type: 'string',
    
      },
    },
  },
})
  @Post()
  async createSoldePoint(
    @Res() response,
    @Body() createSoldePointDto: CreateSoldePointDto,
  ) {
    try {
      const newSoldePoint =
        await this.soldePointService.createSoldePoint(createSoldePointDto);
      return response.status(HttpStatus.CREATED).json({
        message: "Solde point has been created successfully",
        newSoldePoint,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "Error: solde point not created!" + err,
      });
    }
  }

@ApiBody({
  schema: {
    type:'object',
    properties: {
      points: {
        type: 'number',
          },
      montant: {
        type: 'number',
      
      },
      clientId: {
        type: 'string',
    
      },
    },
  },
})
  @Put("/:id")
  async updateSoldePoint(
    @Res() response,
    @Param("id") soldePointId: string,
    @Body() updateSoldePointDto: UpdateSoldePointDto,
  ) {
    try {
      const existingSoldePoint = await this.soldePointService.UpdateSoldePoint(
        soldePointId,
        updateSoldePointDto,
      );
      return response.status(HttpStatus.OK).json({
        message: "Solde Point has been successfully updated",
        existingSoldePoint,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getSolidesPoint(@Res() response) {
    try {
      const soldePointData = await this.soldePointService.getAllSoldePoint();
      return response.status(HttpStatus.OK).json({
        message: "All solides data found successfully",
        soldePointData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get("/:id")
  async getSolidPoint(@Res() response, @Param("id") solidePointId: string) {
    try {
      const existingsolidePoint =
        await this.soldePointService.getSolidePoint(solidePointId);
      return response.status(HttpStatus.OK).json({
        message: "solide point found successfully",
        existingsolidePoint,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete("/:id")
  async deleteSolidePoint(@Res() response, @Param("id") solidePointId: string) {
    try {
      const deletedSolidePoint =
        await this.soldePointService.deleteSolidePoint(solidePointId);
      return response.status(HttpStatus.OK).json({
        message: "Solide point deleted successfully",
        deletedSolidePoint,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
