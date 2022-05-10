import { AbstractEntity } from '../../../common/entities';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ default: 'User' })
  public role: 'User' | 'Admin';

  @Column({ unique: true })
  public email: string;

  @Column()
  @Exclude()
  public password: string;
}
