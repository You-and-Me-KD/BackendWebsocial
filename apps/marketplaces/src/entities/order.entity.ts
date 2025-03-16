import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';
import {
  CURRENCY_ENUM,
  ORDER_PAYMENT_METHOD_ENUM,
  ORDER_STATUS_ENUM,
} from '../enums';
import { OrderItemEntity } from './order-item.entity';
import { TransactionEntity } from './transaction.entity';

@Entity('orders')
export class OrderEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  buyerId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  totalPrice: string;

  @Column({
    type: 'enum',
    enum: CURRENCY_ENUM,
    nullable: false,
    enumName: 'currency_enum',
  })
  currency: CURRENCY_ENUM;

  @Column({
    type: 'enum',
    enum: ORDER_STATUS_ENUM,
    nullable: false,
    enumName: 'order_status_enum',
  })
  status: ORDER_STATUS_ENUM;

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  state: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  zip: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  country: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  detailAddress: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  code: string;

  @Column({
    type: 'enum',
    enum: ORDER_PAYMENT_METHOD_ENUM,
    nullable: false,
    default: ORDER_PAYMENT_METHOD_ENUM.CREDIT_CARD,
    enumName: 'order_payment_method_enum',
  })
  paymentMethod: ORDER_PAYMENT_METHOD_ENUM;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItems: OrderItemEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.order)
  transactions: TransactionEntity[];
}
