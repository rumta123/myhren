// // data.controller
// import { Controller, Post, Body } from '@nestjs/common';
// import { DataService } from './data.service';
// import { CreateDataDto } from '../users/dto/create-data.dto'; // Убедитесь, что импорт верный
// import { Moto } from '../users/entities/moto.entity'; // Добавьте импорт для сущности Moto
// import { ArendaStatusService } from '../arenda-status/arenda-status.service'; // Возможно, вам потребуется добавить этот импорт
// import { CreateMotoDto } from '../users/dto/create-moto.dto';
// import { CreateArendaStatusDto } from '../users/dto/create-arenda-status.dto';

// @Controller('data')
// export class DataController {
//   constructor(
//     private readonly dataService: DataService,
//     private readonly arendaStatusService: ArendaStatusService, // Убедитесь, что ваши сервисы правильно импортированы
//   ) {}

//   @Post()
//   async createData(@Body() createDataDto: CreateDataDto): Promise<any> {
//     const moto: Moto = await this.dataService.createMoto(createDataDto.motoDto);

//     // const arendaStatus = await this.arendaStatusService.createArendaStatus1({
//     //   ...createDataDto.arendaStatusDto,
//     //   moto: { id: moto.id },
//     // });

//   //   return { moto, arendaStatus };
//   // }
// }
