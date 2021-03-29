import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Hotel {
  @PrimaryColumn('varchar')
  id: string;

  @Column()
  name: string;
}
