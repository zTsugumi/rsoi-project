import { AbstractEntity } from '../../../common/entities';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'chats' })
export class ChatEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 20000 })
  public content: string;

  @Column()
  public roomUUID: string;

  @Column()
  public userUUID: string;

  @Column()
  public type: string;

  @Column({ type: 'timestamptz' })
  public atTime: Date;
}
