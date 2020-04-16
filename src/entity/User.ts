import { Entity, Column } from 'typeorm';

@Entity()
export class User {
  @Column()
  id: number;

  @Column()
  name: string;
}
