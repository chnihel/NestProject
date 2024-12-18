/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpStatus, Res, Get } from '@nestjs/common';
import { PanierService } from './panier.service';
import { CreatePanierDto } from './dto/create-panier.dto';


@Controller('panier')
export class PanierController {
  constructor(private readonly panierService: PanierService) {}

  @Post()
  async createPanier(
    @Res() response ,
    @Body() createPanierDto: CreatePanierDto) {
      try {
        const newPanier = await this.panierService.createPanier(createPanierDto);
        return response.status(HttpStatus.CREATED).json({
          message:'panier has been created successfully',
          newPanier,
        });
        
      } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error while creating panier'+err,
          statusCode:400,
        })
        
      } 
 }

   @Get()
  async getPanier (    @Res() response ,
) {
  try {
      const panierData = await this.panierService.getAllPanier();
      return response.status(HttpStatus.OK).json({
        message: "All panier data found successfully",
        panierData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }  }
/*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.panierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePanierDto: UpdatePanierDto) {
    return this.panierService.update(+id, updatePanierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.panierService.remove(+id);
  } */
}
