import { AbstractEntity } from '../../../common/entities';
import { Column, Entity } from 'typeorm';
import ChatType from '../enums/chatType.enum';

@Entity({ name: 'chats' })
export class ChatEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 20000, nullable: false })
  public content: string;

  @Column()
  public roomUUID: string;

  @Column()
  public userUUID: string;

  @Column({
    type: 'enum',
    enum: ChatType,
    default: ChatType.text,
  })
  public type: ChatType;

  @Column({ type: 'timestamptz', nullable: false })
  public atTime: Date;
}
