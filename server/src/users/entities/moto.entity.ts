// moto.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany } from 'typeorm';
import { UserMotoArenda } from './user-moto-arenda.entity';
import { ArendaStatus } from './arenda-status.entity';
import { Tour } from './tour.entity';
@Entity()
export class Moto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  equipment_name: string;

  @Column({ nullable: true })
  price: number;

  @ManyToOne(() => ArendaStatus, (arendaStatus) => arendaStatus.userMotoArendas) // Здесь добавлено
  arendaStatus: ArendaStatus;

  @OneToMany(() => UserMotoArenda, (userMotoArenda) => userMotoArenda.moto)
  userMotoArendas: UserMotoArenda[];

   // Добавьте отношение ManyToOne к туру
   // Добавьте отношение ManyToMany к турам
   @ManyToMany(() => Tour, tour => tour.motos)
   tours: Tour[];
}
