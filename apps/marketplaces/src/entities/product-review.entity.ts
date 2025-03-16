import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_reviews')
export class ProductReviewEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'uuid', nullable: false })
  productId: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'float', nullable: false, default: 5 })
  rating: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reason: string;

  @ManyToOne(() => ProductEntity, (product) => product.reviews)
  product: ProductEntity;
}
