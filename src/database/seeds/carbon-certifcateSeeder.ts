import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { CarbonCertificateEntity } from '../../carbonCertificate/entities/carbonCertificate.entity';
import { CarbonCertifcateStatus } from '../../carbonCertificate/constants/carbonCertificate.constants';
export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userFactory = await factoryManager.get(UserEntity);
    const carbonCertifcateFactory = await factoryManager.get(
      CarbonCertificateEntity,
    );
    const users = await userFactory.saveMany(5);
    const list = [];
    for (const user of users) {
      const carbonCertifcate = await carbonCertifcateFactory.make();
      carbonCertifcate.owner = user;
      carbonCertifcate.status = CarbonCertifcateStatus.OWNED;
      list.push(carbonCertifcateFactory.save(carbonCertifcate));
    }
    await Promise.all(list);
    await carbonCertifcateFactory.saveMany(95);
  }
}
