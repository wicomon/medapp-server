import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { ContextUser } from 'src/auth/entities/auth.entity';
import { PrismaClient as PrismaService } from '@prisma/client';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        {
          provide: PrismaService,
          useValue: {
            appointment: {
              findUnique: jest.fn().mockResolvedValue(null),
              findMany: jest.fn().mockResolvedValue([]),
              findFirst: jest.fn().mockResolvedValue(null),
              create: jest.fn().mockResolvedValue(true),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return an appointment if found', async () => {
      const appointment = { id: 1, patientId: 1, dateString: '2023-10-10' };
      (prismaService.appointment.findUnique as jest.Mock).mockResolvedValue(appointment);

      expect(await service.findOne(1)).toEqual(appointment);
    });

    it('should throw NotFoundException if appointment not found', async () => {
      (prismaService.appointment.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of appointments', async () => {
      const appointments = [{ id: 1, patientId: 1, dateString: '2023-10-10' }];
      (prismaService.appointment.findMany as jest.Mock).mockResolvedValue(appointments);

      expect(await service.findAll()).toEqual(appointments);
    });
  });

  describe('create', () => {
    it('should create a new appointment', async () => {
      const createAppointmentInput: CreateAppointmentInput = {
        patientId: 1,
        dateString: '2023-10-10',
        startTime: 1736280112202,
        endTime: 1736280112202,
      };
      const contextUser: ContextUser = { id: 1, firstName: 'testuser', email: 'w.cordova@cheil.com', lastName: 'testuser', isActive: true, nickName: 'w.cordova'};
      (prismaService.appointment.findFirst as jest.Mock).mockResolvedValue(null);
      (prismaService.appointment.create as jest.Mock).mockResolvedValue(true);

      expect(await service.create(createAppointmentInput, contextUser)).toEqual(true);
    });

    it('should throw BadRequestException if appointment already exists', async () => {
      const createAppointmentInput: CreateAppointmentInput = {
        patientId: 1,
        dateString: '2023-10-10',
        startTime: 1736280112202,
        endTime: 1736280112202,
      };
      const contextUser: ContextUser = { id: 1, firstName: 'testuser', email: 'w.cordova@cheil.com', lastName: 'testuser', isActive: true, nickName: 'w.cordova'};

      (prismaService.appointment.findFirst as jest.Mock).mockResolvedValue({ id: 1 });

      await expect(service.create(createAppointmentInput, contextUser)).rejects.toThrow(BadRequestException);
    });
  });
});
