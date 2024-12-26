import { Injectable } from '@nestjs/common';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class PatientService {
  constructor(
    private readonly prisma : PrismaService

  ) {}

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  async findAll(idDoctor: number) {
    const patients = await this.prisma.patient.findMany({
      where: {
        doctorId: idDoctor
      }
    });
    return patients;
  }

  create(createPatientInput: CreatePatientInput) {
    return 'This action adds a new patient';
  }

  update(id: number, updatePatientInput: UpdatePatientInput) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
