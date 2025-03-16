import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { PaymentMethodEntity } from './payment-method.entity';

@Entity('user_payment_methods')
export class UserPaymentMethodEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'uuid', nullable: false })
  paymentMethodId: string;

  @ManyToOne(() => UserEntity, (user) => user.paymentMethods)
  user: UserEntity;

  @ManyToOne(
    () => PaymentMethodEntity,
    (paymentMethod) => paymentMethod.userPaymentMethods,
  )
  paymentMethod: PaymentMethodEntity;
}
