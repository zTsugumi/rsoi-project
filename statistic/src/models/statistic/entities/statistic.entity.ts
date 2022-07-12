import { AbstractEntity } from 'src/common/entities';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'statistics' })
export class StatisticEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  public service: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  public description: string;

  @Column({ type: 'timestamptz', nullable: false })
  public atTime: Date;
}
