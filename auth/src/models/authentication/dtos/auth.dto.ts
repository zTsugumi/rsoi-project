import { AbstractDto } from '../../../common/dtos';

export class AuthDto extends AbstractDto {
  readonly emailAddress: string;
}
