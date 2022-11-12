import { setSeederFactory } from 'typeorm-extension';
import { CarbonCertificateEntity } from '../../carbon-certifcate/entities/carbon-certifcate.entity';
export default setSeederFactory(CarbonCertificateEntity, (faker) => {
  const carbon = new CarbonCertificateEntity();
  carbon.country = faker.address.country();
  return carbon;
});
