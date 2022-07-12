import { AbstractEntity } from '../../../common/entities';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import Role from '../enums/role.enum';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  public firstName: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  public lastName: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.user,
  })
  public role: Role;

  @Column({ unique: true, nullable: false })
  public email: string;

  @Column({ nullable: false })
  @Exclude()
  public password: string;
}
