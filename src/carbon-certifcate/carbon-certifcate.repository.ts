import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { CarbonCertificateEntity } from './entities/carbon-certifcate.entity';
import { ApiParams } from '../ApiParams';

@EntityRepository(CarbonCertificateEntity)
export class CarbonCertifcateRepository extends Repository<CarbonCertificateEntity> {
  async getAll(
    conditions?: FindManyOptions<CarbonCertificateEntity>,
    params?: ApiParams,
  ): Promise<
    | {
        result: CarbonCertificateEntity[];
        pages: number;
        length: number;
        page: number;
      }
    | CarbonCertificateEntity[]
  > {
    if (params && params.paginate) {
      const count = await super.count(conditions);
      conditions['take'] = params.limit;
      conditions['skip'] = params.limit * params.page;
      const entities = await super.find(conditions);
      const pagesCount = Math.ceil(count / params.limit) || 1;
      const result = {
        result: entities,
        page: params.page,
        length: count,
        pages: pagesCount,
      };
      return result;
    }
    return super.find(conditions);
  }
}
