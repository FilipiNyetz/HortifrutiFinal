/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsuarioModule } from '../usuario/usuario.module';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    forwardRef(() => UsuarioModule),
    PassportModule,
    JwtModule.register({
      secret: 'segredo123',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule { }