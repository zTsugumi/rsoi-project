import { AbstractEntity } from '../../../common/entities';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import Role from '../enums/role.enum';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  public role: Role;

  @Column({ unique: true })
  public email: string;

  @Column()
  @Exclude()
  public password: string;
}
