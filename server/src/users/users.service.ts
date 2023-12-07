import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,  ILike } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async createUsers(Users: Partial<Users>): Promise<Users> {
    const newMoto = this.usersRepository.create(Users);
    return this.usersRepository.save(newMoto);
  }
  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }



  async getUserById(id: number): Promise<Users> {
    try {
      const tour = await this.usersRepository.findOne({ where: { id: id } });
      if (!tour) {
        throw new NotFoundException(`Tour with ID ${id} not found`);
      }
      return tour;
    } catch (error) {
      throw new NotFoundException(`Tour with ID ${id} not found`);
    }
  }

  async create(userData: Partial<Users>): Promise<Users> {
    
    const user = this.usersRepository.create(userData);
    return await this.usersRepository.save(user);
  }
  async updateUser(id: number, userData: Partial<Users>): Promise<Users> {
    // Найти тур в базе данных по идентификатору
    const userToUpdate = await this.getUserById(id);

    if (!userToUpdate) {
      // Если тур не найден, вы можете бросить ошибку или вернуть null
      throw new NotFoundException(`Tour with id ${id} not found`);
    }

    // Обновить данные тура с использованием данных из tourData
    this.usersRepository.merge(userToUpdate, userData);

    // Сохранить обновленный тур в базе данных
    return this.usersRepository.save(userToUpdate);
  }


  findOne(id: number): Promise<Users> {
    return this.usersRepository.findOneBy({ id: id });
  }

  

  async findFio(startingChars: string): Promise<Users[]> {
    return this.usersRepository.find({
      where: { fio: ILike(`${startingChars}%`) },
      order: { fio: 'ASC' } // Сортировка результатов по фамилии по возрастанию, если необходимо
    });
  }
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}