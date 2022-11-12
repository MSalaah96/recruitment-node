import { Injectable } from '@nestjs/common';
import { CarbonCertificateEntity } from './entities/carbonCertificate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { carbonCertificateApiParams } from './carbonCertificate.ApiParams';
import { In, Repository } from 'typeorm';

@Injectable()
export class CarbonCertificateService {
  constructor(
    @InjectRepository(CarbonCertificateEntity)
    private carbonCertifcateRepository: Repository<CarbonCertificateEntity>,
  ) {}

  async getAll(params: carbonCertificateApiParams): Promise<
    | {
        result: CarbonCertificateEntity[];
        pages: number;
        length: number;
        page: number;
      }
    | CarbonCertificateEntity[]
  > {
    const query = {};
    if (params.status && params.status.length > 0) {
      query['status'] = In(params.status);
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
