// user-moto-arenda.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { UserMotoArendaService } from './user-moto-arenda.service';
import { UserMotoArenda } from '../users/entities/user-moto-arenda.entity';
import { FindOneOptions } from 'typeorm';
@Controller('user-moto-arenda')
export class UserMotoArendaController {
  constructor(private readonly userMotoArendaService: UserMotoArendaService) { }

  @Get()
  getAllMotos() {
    return this.userMotoArendaService.getAllMotos();
  }

  
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserMotoArenda> {
    return this.userMotoArendaService.findOne(id);
  }
  



// вот может из-за этого косяк?
  @Get(':id/:userId')
  async getMotoById1(
    @Param('id') id: number,
    @Param('userId') userId: number,
  ): Promise<UserMotoArenda[]> {
    return this.userMotoArendaService.getMotoById1(id, userId);
  }



  


  @Put(':id')
  update(@Param('id') id: string, @Body() userMotoArendaData: Partial<UserMotoArenda>): Promise<UserMotoArenda> {
    return this.userMotoArendaService.update(+id, userMotoArendaData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userMotoArendaService.remove(+id);
  }
}
