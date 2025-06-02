import { IsString, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  senha: string;

  @IsEmail()
  email: string;
}

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  senha: string;
}
