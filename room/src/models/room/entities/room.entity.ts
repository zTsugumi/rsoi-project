import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../common/entities';

@Entity({ name: 'rooms' })
export class RoomEntity extends AbstractEntity {
  @Column()
  public name: string;

  @Column()
  public description: string;
}
