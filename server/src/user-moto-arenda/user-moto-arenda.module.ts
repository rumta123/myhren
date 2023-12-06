// user-moto-arenda.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMotoArenda } from '../users/entities/user-moto-arenda.entity';
import { UserMotoArendaController } from './user-moto-arenda.controller';
import { UserMotoArendaService } from './user-moto-arenda.service';
import { Moto } from 'src/users/entities/moto.entity'; 
@Module({
  imports: [TypeOrmModule.forFeature([UserMotoArenda,  Moto])],
  controllers: [UserMotoArendaController],
  providers: [UserMotoArendaService],
})
export class UserMotoArendaModule {}
