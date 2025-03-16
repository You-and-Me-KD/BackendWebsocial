import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserPaymentMethodEntity } from './user-payment-method.entity';
import { PAYMENT_METHOD_ENUM } from '../enums/payment-method.enum';

@Entity('payment_methods')
export class PaymentMethodEntity extends TypeOrmAbstractEntity {
  @Column({
    type: 'enum',
    enum: PAYMENT_METHOD_ENUM,
    nullable: false,
    enumName: 'payment_method_type_enum',
  })
  type: string;

  @OneToMany(
    () => UserPaymentMethodEntity,
    (userPaymentMethod) => userPaymentMethod.paymentMethod,
  )
  userPaymentMethods: UserPaymentMethodEntity[];
}
