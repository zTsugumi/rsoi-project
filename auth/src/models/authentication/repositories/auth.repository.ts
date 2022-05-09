import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { AuthEntity } from '../entities/auth.entity';

@EntityRepository(AuthEntity)
export class AuthRepository extends Repository<AuthEntity> {}
