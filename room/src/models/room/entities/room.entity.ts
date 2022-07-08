import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../common/entities';

@Entity({ name: 'rooms' })
export class RoomEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  public name: string;

  @Column({ type: 'varchar', length: 150 })
  public description: string;
}
