import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PRODUCT_LIKE_TYPE_ENUM } from '../enums';
import { ProductEntity } from './product.entity';

@Entity('product_like')
export class ProductLikeEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'uuid', nullable: false })
  productId: string;

  @Column({
    type: 'enum',
    enum: PRODUCT_LIKE_TYPE_ENUM,
    default: PRODUCT_LIKE_TYPE_ENUM.LIKE,
    enumName: 'product_like_type_enum',
  })
  type: PRODUCT_LIKE_TYPE_ENUM;

  @ManyToOne(() => ProductEntity, (product) => product.likes)
  product: ProductEntity;
}
