/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  Put,
  Get,
  Delete,
} from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('client')
@Controller("client")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}


@ApiBody({
  schema: {
    type:'object',
    properties: {
      name: {
        type: 'string',
          },
        
          prenom :{
            type:'string'
          },
      username: {
        type: 'string',
      
      },
      email: {
        type: 'string',
      },
        password: {
        type: 'string',
      },
        item: {
        type: 'string',
        default:'client'
      },
        dateNaissance: {
        type: 'string',
      },
          adresse: {
        type: 'string',
      },
          soldes: {
        type: 'number',
      },
          classement: {
        type: 'string',
      },
          numeroTel: {
        type: 'string',
      },
     
    },
  },
})
  @Post()
  async createClient(
    @Res() response,
    @Body() createClientDto: CreateClientDto,
  ) {
    try {
      const newClient = await this.clientService.createClient(createClientDto);
      return response.status(HttpStatus.CREATED).json({
        message: "Client has been created successfully",
        newClient,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "Error: client not created!" + err,
      });
    }
  }


@ApiBody({
  schema: {
    type:'object',
    properties: {
      name: {
        type: 'string',
          },
        
          prenom :{
            type:'string'
          },
      username: {
        type: 'string',
      
      },
      email: {
        type: 'string',
      },
        password: {
        type: 'string',
      },
        item: {
        type: 'string',
        default:'client'
      },
        dateNaissance: {
        type: 'string',
      },
          adresse: {
        type: 'string',
      },
          soldes: {
        type: 'number',
      },
          classement: {
        type: 'string',
      },
          numeroTel: {
        type: 'string',
      },
         
    },
  },
})
  @Put("/:id")
  async updateClient(
    @Res() response,
    @Param("id") clientId: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    try {
      const existingClient = await this.clientService.UpdateClient(
        clientId,
        updateClientDto,
      );
      return response.status(HttpStatus.OK).json({
        message: "Client has been successfully updated",
        existingClient,
      });
    } catch (err) {
      const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(status).json({
        message: err.message || "An error occurred while updating the client",
        error: err.response || err,
      });
    }
  }

  @Get()
  async getAllClients(@Res() response) {
    try {
      const clientData = await this.clientService.getAllClients();
      return response.status(HttpStatus.OK).json({
        message: "All clients data found successfully",
        clientData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get("/:id")
  async getClient(@Res() response, @Param("id") clientId: string) {
    try {
      const existingClient = await this.clientService.getClient(clientId);
      return response.status(HttpStatus.OK).json({
        message: "Client found successfully",
        existingClient,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete("/:id")
  async deleteClient(@Res() response, @Param("id") clientId: string) {
    try {
      const deletedClient = await this.clientService.deleteClient(clientId);
      return response.status(HttpStatus.OK).json({
        message: "Client deleted successfully",
        deletedClient,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
