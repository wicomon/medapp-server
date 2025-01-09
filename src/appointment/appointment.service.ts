import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { PrismaService } from 'src/common/services/prisma.service';
import { ContextUser } from 'src/auth/entities/auth.entity';

@Injectable()
export class AppointmentService {
  constructor(
    private prisma: PrismaService
  ) {}
  async findOne(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id
      }
    });
    if(!appointment) throw new NotFoundException('Cita no encontrada');
    return appointment;
  }

  async findAll() {
    const appointments = await this.prisma.appointment.findMany({});
    return appointments;
  }
  
  async create(createAppointmentInput: CreateAppointmentInput, contextUser: ContextUser) {
    // Validate if exists an appointment with the same date and patient
    const appointment = await this.prisma.appointment.findFirst({
      where: {
        patientId: createAppointmentInput.patientId,
        dateString: createAppointmentInput.dateString,
        userId: contextUser.id,
      }
    });

    if (appointment) throw new BadRequestException('Ya existe una cita para el paciente en la fecha seleccionada');

    // Create appointment
    const newAppointment = await this.prisma.appointment.create({
      data: {
        ...createAppointmentInput,
        startTime: new Date(createAppointmentInput.startTime),
        endTime: new Date(createAppointmentInput.endTime),
        userId: contextUser.id,
        status: 'PENDING',
      }
    });

    return true;
  }

  update(id: number, updateAppointmentInput: UpdateAppointmentInput) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
