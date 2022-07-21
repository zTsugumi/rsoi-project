import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../common/entities';

@Entity({ name: 'rooms' })
export class RoomEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  public name: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  public description: string;
}
