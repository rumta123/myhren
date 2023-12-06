import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,  ILike } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async createUsers(Users: Partial<Users>): Promise<Users> {
    const newMoto = this.usersRepository.create(Users);
    return this.usersRepository.save(newMoto);
  }
  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
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