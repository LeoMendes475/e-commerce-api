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

  @Column({ name: 'categoryId', nullable: false })
  userId: string;

  @Column({ name: 'description', length: 100 })
  buyerName: string;

  @Column({ name: 'buyerPassport', length: 6 })
  buyerPassport: string;

  @Column({ name: 'buyerOrganization', length: 100 })
  buyerOrganization: string;

  @Column({ name: 'orderQuantity' })
  orderQuantity: number;

  @OneToOne(() => ProductEntity, (product) => product.id)
  product: ProductEntity;

  @Column({ name: 'productId', nullable: false })
  productId: string;

  @Column({ name: 'userCreatedId', nullable: false })
  userCreatedId: string;

  @Column({ name: 'userUpdatedId', nullable: false })
  userUpdatedId: string;

  @Column({ name: 'userDeletedId', nullable: false })
  userDeletedId: string;

  @CreateDateColumn({ name: 'sellDate' })
  sellDate: Date;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date;
}
