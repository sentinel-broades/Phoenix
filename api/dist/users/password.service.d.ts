import { IPasswordService } from './interfaces/IPasswordService';
export declare class PasswordService implements IPasswordService {
    encrypt(password: string): Promise<string>;
    comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
}
