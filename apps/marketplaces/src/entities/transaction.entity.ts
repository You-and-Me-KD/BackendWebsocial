import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('transactions')
export class TransactionEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  orderId: string;

  @Column({ type: 'uuid', nullable: false })
  buyerId: string;

  @Column({ type: 'int', nullable: false })
  amount: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  currency: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  txHash: string;

  // 'PENDING', 'SUCCESS', 'FAILED'
  @Column({ type: 'varchar', length: 255, nullable: false })
  status: string;

  @ManyToOne(() => OrderEntity, (order) => order.transactions)
  order: OrderEntity;
}
