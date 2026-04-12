import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../prisma/generated/client';

// // @ts-expect-error no types
import { PrismaPg } from '@prisma/adapter-pg';

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
//   constructor() {
//     const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
//     super({ adapter: pool });
//   }
//   async onModuleInit() {
//     // Note: this is optional
//     await this.$connect();
//   }

//   async onModuleDestroy() {
//     await this.$disconnect();
//   }
// }

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
    super({
      adapter: pool,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
