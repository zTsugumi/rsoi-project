import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { AuthEntity } from '../entities/auth.entity';
import { AuthProvider } from '../providers/auth.provider';

@EventSubscriber()
export class AuthSubscriber implements EntitySubscriberInterface<AuthEntity> {
  listenTo() {
    return AuthEntity;
  }

  public async beforeInsert({
    entity,
  }: InsertEvent<AuthEntity>): Promise<void> {
    if (entity.password) {
      entity.password = await AuthProvider.generateHash(entity.password);
    }

    if (entity.emailAddress) {
      entity.emailAddress = entity.emailAddress.toLowerCase();
    }
  }

  public async beforeUpdate({
    entity,
    databaseEntity,
  }: UpdateEvent<AuthEntity>): Promise<void> {
    if (entity.password) {
      const password = await AuthProvider.generateHash(entity.password);

      if (password !== databaseEntity?.password) {
        entity.password = password;
      }
    }
  }
}
