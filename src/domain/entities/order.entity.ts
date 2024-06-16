import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @Column({ name: 'userId', nullable: false })
  userId: string;

  @Column({ name: 'buyerName', length: 100, nullable: false })
  buyerName: string;

  @Column({ name: 'buyerPassport', length: 6, nullable: false })
  buyerPassport: string;

  @Column({ name: 'buyerOrganization', length: 100, nullable: false })
  buyerOrganization: string;

  @Column({ name: 'orderQuantity', nullable: false })
  orderQuantity: number;

  @OneToOne(() => ProductEntity, (product) => product.id)
  product: ProductEntity;

  @Column({ name: 'productId', nullable: false })
  productId: string;

  @Column({ name: 'userCreatedId', nullable: false })
  userCreatedId: string;

  @Column({ name: 'userUpdatedId' })
  userUpdatedId: string;

  @Column({ name: 'userDeletedId' })
  userDeletedId: string;

  @CreateDateColumn({ name: 'sellDate', nullable: false })
  sellDate: Date;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date;
}
