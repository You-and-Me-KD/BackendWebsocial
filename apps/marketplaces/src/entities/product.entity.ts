import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { CURRENCY_ENUM } from '../enums';
import { NftEntity } from './nft.entity';
import { CategoryEntity } from './category.entity';
import { ProductLikeEntity } from './product-like.entity';
import { ProductReviewEntity } from './product-review.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity('products')
export class ProductEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  ownerId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'uuid', nullable: false })
  categoryId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  regularPrice: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  extendPrice: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  salePrice: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  productURL: string;

  @Column({ type: 'int', nullable: false })
  remain: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  productTags: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  previewImage: string;

  @Column({ type: 'boolean', default: false })
  isNFT: boolean;

  @Column({
    type: 'enum',
    enum: CURRENCY_ENUM,
    default: CURRENCY_ENUM.USD,
    enumName: 'currency_enum',
  })
  currency: CURRENCY_ENUM;

  @Column({ type: 'int', default: 0 })
  totalSupply: number;

  @OneToOne(() => NftEntity, (nft) => nft, {
    eager: true,
    cascade: true,
  })
  nft: NftEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;

  @OneToMany(() => ProductLikeEntity, (productLike) => productLike.product)
  likes: ProductLikeEntity[];

  @OneToMany(
    () => ProductReviewEntity,
    (productReview) => productReview.product,
  )
  reviews: ProductReviewEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemEntity[];
}
