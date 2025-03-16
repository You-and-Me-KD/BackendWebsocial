import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { NFT_TYPE_ENUM } from '../enums/nft.enum';
import { ProductEntity } from './product.entity';

@Entity('nfts')
export class NftEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  tokenAddress: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  tokenId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  tokenURI: string;

  @Column({ type: 'jsonb', nullable: false })
  metadata: any;

  @Column({ type: 'varchar', length: 255, nullable: false })
  ownerAddress: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  contractAddress: string;

  @Column({
    type: 'enum',
    enum: NFT_TYPE_ENUM,
    default: NFT_TYPE_ENUM.ERC721,
    enumName: 'nft_type',
  })
  contractType: NFT_TYPE_ENUM;

  @Column({ type: 'timestamp', nullable: false })
  blockTimestamp: Date;

  @OneToOne(() => ProductEntity, (product) => product.nft)
  @JoinColumn()
  product: ProductEntity;
}
