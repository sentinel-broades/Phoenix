import {
  IsDateString,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MaxLength(250)
  readonly name: string;

  @IsDateString()
  readonly dateOfBirth: Date;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password should have at least one uppercase letter, one lowercase letter and one number or special character',
  })
  password: string;
}
