import { CarbonCertificateEntity } from '../../carbonCertificate/entities/carbonCertificate.entity';
import { setSeederFactory } from 'typeorm-extension';
export default setSeederFactory(CarbonCertificateEntity, (faker) => {
  const carbon = new CarbonCertificateEntity();
  carbon.country = faker.address.country();
  return carbon;
});
