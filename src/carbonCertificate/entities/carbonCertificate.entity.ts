import { UserEntity } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarbonCertifcateStatus } from '../constants/carbonCertificate.constants';

@Entity('carbon_certifcates')
export class CarbonCertificateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  country: string;

  @Column({
    type: 'enum',
    enum: CarbonCertifcateStatus,
    default: CarbonCertifcateStatus.AVAILABLE,
  })
  status: CarbonCertifcateStatus;

  @Column({ nullable: true })
  ownerId: number | null;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
  @JoinColumn()
  owner: UserEntity | null;
}
