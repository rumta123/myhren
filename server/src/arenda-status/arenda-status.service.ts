// arenda-status.service
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArendaStatus } from '../users/entities/arenda-status.entity';
import { TourDate } from '../users/entities/tour-date.entity';
import { Users } from 'src/users/entities/users.entity';
@Injectable()
export class ArendaStatusService {
  constructor(
    @InjectRepository(ArendaStatus)
    private readonly arendaStatusRepository: Repository<ArendaStatus>,
    @InjectRepository(TourDate)
    private readonly tourDateRepository: Repository<TourDate>,
    @InjectRepository(TourDate)
    private readonly UsersRepository: Repository<Users>,
  ) { }

  // Метод для получения статуса аренды по определенной дате тура
  async getArendaStatusByTourDate(tourDateId: number): Promise<ArendaStatus[]> {
    return this.arendaStatusRepository.find({
      where: { tourDate: { date_id: tourDateId } },
      relations: ['tourDate', 'tourDate.tour'], // Обратите внимание, что здесь 'tourDate.tour'
    });
  }
  async getArendaStatusByUserId(UserId: number): Promise<ArendaStatus[]> {
    try {
      const arendaStatuses = await this.arendaStatusRepository.find({
        where: { user: { id: UserId } },
        relations: ['user', 'moto', 'tourDate', 'tourDate.tour'], // Загружаем связанные сущности
      });

      return arendaStatuses;
    } catch (error) {
      console.error('Error fetching ArendaStatus:', error);
      throw error;
    }
  }
  async create(arendaData: Partial<ArendaStatus>): Promise<ArendaStatus> {
    const arendaStatus = this.arendaStatusRepository.create(arendaData);
    return await this.arendaStatusRepository.save(arendaStatus);
  }

  async getAllMotos(): Promise<ArendaStatus[]> {
    return await this.arendaStatusRepository.find({
      relations: ['tourDate', 'moto', 'user'],
    });
  }


  async createArendaStatus1(arendaStatusData: Partial<ArendaStatus>): Promise<ArendaStatus> {
    console.log('Received arenda data:', arendaStatusData);
    const createdArendaStatus = this.arendaStatusRepository.create(arendaStatusData);
    return this.arendaStatusRepository.save(createdArendaStatus);
  }

  // Метод для создания нового статуса аренды для указанной даты тура
  async createArendaStatus(tourDateId: number, arendaStatusData: Partial<ArendaStatus>): Promise<ArendaStatus> {
    try {
      // Логирование перед выполнением запроса
      console.log('Received arenda data in service:', arendaStatusData);

      // Остальной код
      const tourDate = await this.tourDateRepository.findOne({
        where: { date_id: tourDateId },
        relations: ['arendaStatus'],
      } as any);

      if (!tourDate) {
        throw new NotFoundException(`TourDate with ID ${tourDateId} not found`);
      }

      const newArendaStatus = this.arendaStatusRepository.create({
        ...arendaStatusData,
        tourDate: tourDate,
      });

      const savedArendaStatus = await this.arendaStatusRepository.save(newArendaStatus);

      // Логирование после выполнения запроса
      console.log('Saved ArendaStatus:', savedArendaStatus);

      return savedArendaStatus;
    } catch (error) {
      console.error('Error creating ArendaStatus:', error);
      throw error;
    }
  }

}
