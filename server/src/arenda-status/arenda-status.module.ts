import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArendaStatus } from '../users/entities/arenda-status.entity';
import { TourDate } from '../users/entities/tour-date.entity'; // Добавьте импорт TourDate
import { ArendaStatusService } from './arenda-status.service';
import { ArendaStatusController } from './arenda-status.controller';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ArendaStatus, TourDate,]), // Добавьте TourDate
    UsersModule,
  ],
  providers: [ArendaStatusService],
  controllers: [ArendaStatusController],

})
export class ArendaStatusModule {}
