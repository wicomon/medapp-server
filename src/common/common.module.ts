import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { EmailService } from './services/email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [PrismaService, EmailService],
  exports: [PrismaService, EmailService],
  imports: [ConfigModule]
})
export class CommonModule {}
