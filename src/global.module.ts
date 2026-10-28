import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import { StorageService } from './shared/storage/storage.service';

@Global()
@Module({
  providers: [JwtService, PrismaService, StorageService],
  exports: [JwtService, PrismaService, StorageService],
})
export class GlobalModule {}
