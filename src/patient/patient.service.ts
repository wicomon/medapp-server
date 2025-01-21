import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';
import { PrismaService } from 'src/common/services/prisma.service';
import { ContextUser } from 'src/auth/entities/auth.entity';

@Injectable()
export class PatientService {
  constructor(
    private readonly prisma : PrismaService

  ) {}

  async findOne(id: number) {
    const patient = await this.prisma.patient.findFirst({
      where: {
        id
      }
    });
    if(!patient) throw new NotFoundException('Paciente no encontrado');
    return patient;
  }

  async findAll(idDoctor: number) {
    const patients = await this.prisma.patient.findMany({
      where: {
        doctorId: idDoctor
      }
    });
    return patients;
  }

  async findByDni(dni: string) {
    const patients = await this.prisma.patient.findFirst({
      where: { dni }
    });
    return patients;
  }

  async create(createPatientInput: CreatePatientInput, contextUser: ContextUser) {
    const existUser = await this.prisma.patient.findFirst({
      where: { email: createPatientInput.email.trim(), isActive: true },
    });
    if(existUser) throw new BadRequestException('Paciente '+createPatientInput.email+' ya existe');

    const newPatient = await this.prisma.patient.create({
      data:{
        ...createPatientInput,
        doctorId: contextUser.id,
        createdBy: contextUser.id,
        birth: new Date(createPatientInput.birth),
      }
    });

    return true

  }

  update(id: number, updatePatientInput: UpdatePatientInput, user: ContextUser) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number, user: ContextUser) {
    return `This action removes a #${id} patient`;
  }
}
