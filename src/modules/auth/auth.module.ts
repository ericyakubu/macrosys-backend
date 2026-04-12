import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { UserAuthController } from './controllers/user-auth.controller';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/infrastructure/jwt/jwt.strategy';
// import { HttpModule } from '@nestjs/axios';
@Module({
  controllers: [AdminAuthController, UserAuthController, AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    // UserModule,
    // HttpModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
})
export class AuthModule {}
