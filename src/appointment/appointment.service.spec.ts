import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { ContextUser } from 'src/auth/entities/auth.entity';

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
              findUnique: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
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
      const result = { id: 1, dateString: '2023-10-10' };

      (jest.spyOn(prismaService.appointment, 'findUnique') as jest.Mock).mockResolvedValue(result);

      expect(await service.findOne(1)).toEqual(result);
    });

    it('should throw NotFoundException if appointment not found', async () => {
      jest.spyOn(prismaService.appointment, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of appointments', async () => {
      const result = [{ id: 1, dateString: '2023-10-10' }];

      (jest.spyOn(prismaService.appointment, 'findMany') as jest.Mock).mockResolvedValue([{ id: 1, dateString: '2023-10-10' }]);
      const serviceResult = await service.findAll();
      // console.log({serviceResult})
      expect(serviceResult).toEqual(result);

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
      const contextUser: ContextUser = { id: 1, firstName: 'testuser', email: 'w.cordova@cheil.com', lastName: 'testuser', isActive: true, nickName: 'w.cordova' };
      const result = { id: 1, ...createAppointmentInput };

      jest.spyOn(prismaService.appointment, 'findFirst').mockResolvedValue(null);
      (jest.spyOn(prismaService.appointment, 'create') as jest.Mock).mockResolvedValue(result);
      const serviceResult = await service.create(createAppointmentInput, contextUser);
      // console.log({serviceResult2: service})
      expect(serviceResult).toEqual(true);
    });

    it('should throw BadRequestException if appointment already exists', async () => {
      const createAppointmentInput: CreateAppointmentInput = {
        patientId: 1,
        dateString: '2023-10-10',
        startTime: 1736280112202,
        endTime: 1736280112202,
      };
      const contextUser: ContextUser = { id: 1, firstName: 'testuser', email: 'w.cordova@cheil.com', lastName: 'testuser', isActive: true, nickName: 'w.cordova' };

      (jest.spyOn(prismaService.appointment, 'findFirst') as jest.Mock).mockResolvedValue({ id: 1 });

      const serviceResult = service.create(createAppointmentInput, contextUser);

      await expect(serviceResult).rejects.toThrow(BadRequestException);
    });
  });
});