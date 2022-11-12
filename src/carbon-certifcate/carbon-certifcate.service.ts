import { Injectable } from '@nestjs/common';
import { CarbonCertificateEntity } from './entities/carbon-certifcate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { carbonCertifcateApiParams } from './carbon-certifcate.ApiParams';
import { Any, In, Repository } from 'typeorm';

@Injectable()
export class CarbonCertifcateService {
  constructor(
    @InjectRepository(CarbonCertificateEntity)
    private carbonCertifcateRepository: Repository<CarbonCertificateEntity>,
  ) {}

  async getAll(params: carbonCertifcateApiParams): Promise<
    | {
        result: CarbonCertificateEntity[];
        pages: number;
        length: number;
        page: number;
      }
    | CarbonCertificateEntity[]
  > {
    console.log('params: ', params);
    const query = {};

    if (params.status) {
      query['status'] = In(params.status.split(','));
    }
    if (params && params.paginate) {
      const count = await this.carbonCertifcateRepository.count({
        where: query,
      });
      const conditions = { where: query };
      conditions['take'] = params.limit;
      conditions['skip'] = params.limit * params.page;
      const entities = await this.carbonCertifcateRepository.find(conditions);
      const pagesCount = Math.ceil(count / params.limit) || 1;
      const result = {
        result: entities,
        page: params.page,
        length: count,
        pages: pagesCount,
      };
      return result;
    }
    return this.carbonCertifcateRepository.find({ where: query });
  }
}
