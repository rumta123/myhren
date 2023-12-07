// arenda-status.controller
import { Controller, Get, Post, Body, Param, Delete, Inject  } from '@nestjs/common';
import { ArendaStatusService } from './arenda-status.service';
import { ArendaStatus } from '../users/entities/arenda-status.entity';
import { UsersService } from 'src/users/users.service';
@Controller('arenda-status')
export class ArendaStatusController {
  constructor(
    private readonly arendaStatusService: ArendaStatusService,
    @Inject(UsersService) private readonly usersService: UsersService,
    ) {}

  @Get('all')
  getAllMotos() {
    return this.arendaStatusService.getAllMotos();
  }
  // Контроллер для получения статуса аренды по определенной дате тура
  @Get('by-tour-date/:tourDateId')
  async getArendaStatusByTourDate(@Param('tourDateId') tourDateId: number): Promise<ArendaStatus[]> {
    return this.arendaStatusService.getArendaStatusByTourDate(tourDateId);
  }

  @Get('users/:userId')
  async getArendaStatusByUserId(@Param('userId') userId: number): Promise<ArendaStatus[]> {
    return this.arendaStatusService.getArendaStatusByUserId(userId);
  }

  // Контроллер для создания нового статуса аренды для указанной даты тура
  @Post(':tourDateId')
  async createArendaStatus(
    @Param('tourDateId') tourDateId: number,
    @Body() arendaStatusData: Partial<ArendaStatus>,
  ): Promise<ArendaStatus> {
    return this.arendaStatusService.createArendaStatus(tourDateId, arendaStatusData);
  }

  @Post()
  async createArendaStatus1(@Body() arendaStatusData: Partial<ArendaStatus>): Promise<ArendaStatus> {
    return this.arendaStatusService.createArendaStatus1(arendaStatusData);
  }

  
  @Post('users-and-arenda')
  async createNewUserAndArenda(@Body() data: any) {
    try {
      console.log('Received data:', data);
      // Создаем пользователя
     // Создаем пользователя
    const user = await this.usersService.create(data.user);

    // Создаем аренду, связанную с пользователем
    const arendaData = { ...data.arenda, user: user.id };
    console.log(arendaData);
    await this.arendaStatusService.create(arendaData);

    return { id: user.id };
  } catch (error) {
    console.error('Error creating user and arenda:', error);
    throw new Error('Failed to create user and arenda');
  }
  }

  // Другие методы, такие как update и delete, могут быть добавлены по вашему усмотрению.
}
