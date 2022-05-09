import { AbstractEntity } from '../../../common/entities';
import { AuthEntity } from '../../authentication/entities/auth.entity';
import { Column, Entity, JoinColumn, OneToOne, Index } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @OneToOne(() => AuthEntity, (auth: AuthEntity) => auth.user, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Index()
  public auth: AuthEntity;
}
