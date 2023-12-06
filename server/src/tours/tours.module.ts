// tours/tours.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from '../users/entities/tour.entity';
import { TourController } from './tour.controller';
import { TourService } from './tour.service';
import { Moto } from 'src/users/entities/moto.entity';
import { MotoController } from 'src/moto/moto.controller';
import { MotoService } from 'src/moto/moto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tour, Moto])],
  controllers: [TourController, MotoController],
  providers: [TourService, MotoService],
})
export class ToursModule {}
