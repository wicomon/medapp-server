import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './appointment.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [AppointmentResolver, AppointmentService],
  imports: [CommonModule],
})
export class AppointmentModule {}
