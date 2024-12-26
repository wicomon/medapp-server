import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientResolver } from './patient.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [PatientResolver, PatientService],
  imports: [CommonModule]
})
export class PatientModule {}
