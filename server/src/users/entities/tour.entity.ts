// tour.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { TourDate } from './tour-date.entity';
import { ArendaStatus } from './arenda-status.entity';
import { Moto } from './moto.entity';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  tour_id: number;

  @Column({ type: 'text', nullable: true })
  tour_name: string;

  @Column({ type: 'text', nullable: true })
  tour_description: string;

  @OneToMany(() => TourDate, (tourDate) => tourDate.tour, { onDelete: 'CASCADE' })
  tourDates: TourDate[];

  @OneToMany(() => ArendaStatus, (arendaStatus) => arendaStatus.tourDate)
  arendaStatus: ArendaStatus[];

   // Добавьте отношение OneToMany к мотоциклам
 // Добавьте отношение ManyToMany к мотоциклам
 @ManyToMany(() => Moto, moto => moto.tours)
 @JoinTable()
 motos: Moto[];
}