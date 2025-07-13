import { User } from 'src/modules/user/entities/user.entity';

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
