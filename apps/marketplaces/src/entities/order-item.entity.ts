import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity('order_items')
export class OrderItemEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  orderId: string;

  @Column({ type: 'uuid', nullable: false })
  productId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  quantity: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  price: string;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderItems)
  product: ProductEntity;
}
