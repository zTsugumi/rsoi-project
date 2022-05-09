import { Exclude } from 'class-transformer';
import { AbstractEntity } from '../../../common/entities';
import { UserEntity } from '../../user/entities/user.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity({ name: 'authentications' })
export class AuthEntity extends AbstractEntity {
  @Column({ unique: true })
  public emailAddress: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.auth)
  @Exclude()
  public user: UserEntity;
}
