import { setSeederFactory } from 'typeorm-extension';
import { UserEntity } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
export default setSeederFactory(UserEntity, (faker) => {
  const user = new UserEntity();
  user.name = faker.name.fullName();
  user.email = faker.internet.email(user.name);
  user.password = bcrypt.hashSync('P@ssw0rd', 10);
  return user;
});
