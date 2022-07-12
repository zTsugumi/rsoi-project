import { EntityRepository, Repository } from 'typeorm';
import { StatisticEntity } from '../entities/statistic.entity';

@EntityRepository(StatisticEntity)
export class StatisticRepository extends Repository<StatisticEntity> {}
