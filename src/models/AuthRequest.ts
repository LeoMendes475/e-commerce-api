import { Request } from 'express';
import { UserEntity } from 'src/domain/entities/user.entity';

export interface AuthRequest extends Request {
  user: UserEntity;
}
