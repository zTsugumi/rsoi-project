import { Injectable } from '@nestjs/common';
import { StatisticEntity } from './entities/statistic.entity';
import { StatisticRepository } from './repositories/statistic.repository';

@Injectable()
export class StatisticService {
  constructor(private readonly _statisticRepository: StatisticRepository) {}

  public async getStatistics(
    service: string,
    fromDate?: string,
    toDate?: string,
  ) {
    let query = this._statisticRepository
      .createQueryBuilder('stat')
      .where(`stat.service = '${service}'`);

    if (fromDate) {
      query = query.andWhere('stat.atTime >= :fromDate', {
        fromDate: new Date(fromDate),
      });
    }

    if (toDate) {
      query = query.andWhere('stat.atTime <= :toDate', {
        toDate: new Date(toDate),
      });
    }

    return await query.getMany();
  }

  public async addStatistic(statistic: Partial<StatisticEntity>) {
    return await this._statisticRepository.save(statistic);
  }
}
