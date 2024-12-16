import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [CommonModule]
})
export class AuthModule {}
