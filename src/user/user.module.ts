import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [UserResolver, UserService],
  imports:[ConfigModule, CommonModule],
  exports: [UserService]
})
export class UserModule {}
