import { BaseDomain } from '@app/common/domain';

export class ProductDomain extends BaseDomain {
  id: string;
  name: string;
  description: string;
}
