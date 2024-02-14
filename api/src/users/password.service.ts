import * as bcrypt from 'bcryptjs';
import { IPasswordService } from './interfaces/IPasswordService';

export class PasswordService implements IPasswordService {
  async encrypt(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
