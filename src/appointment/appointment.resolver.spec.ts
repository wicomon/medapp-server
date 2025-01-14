import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentResolver } from './appointment.resolver';
import { AppointmentService } from './appointment.service';
import { PrismaService } from 'src/common/services/prisma.service';

describe('AppointmentResolver', () => {
  let resolver: AppointmentResolver;
  let service: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentResolver,
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

    resolver = module.get<AppointmentResolver>(AppointmentResolver);
    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // it('should create a new appointment', async () => {
  //   const createAppointmentInput = {
  //     patientId: 1,
  //     dateString: '2023-10-10',
  //     startTime: 1736280112202,
  //     endTime: 1736280112202,
  //   };
  //   const contextUser = { id: 1, firstName: 'testuser', email: 'w.cordova@cheil.com', lastName: 'testuser', isActive: true, nickName: 'w.cordova' };
  //   const result = { id: 1, ...createAppointmentInput };

  //   (jest.spyOn(service, 'create') as jest.Mock).mockResolvedValue(result);

  //   expect(await resolver.createAppointment(createAppointmentInput, contextUser)).toEqual(result);
  // });

  // it('should return an appointment if found', async () => {
  //   const result = { id: 1, dateString: '2023-10-10' };

  //   (jest.spyOn(service, 'findOne') as jest.Mock).mockResolvedValue(result);

  //   expect(await resolver.findOne(1)).toEqual(result);
  // });

  // it('should return an array of appointments', async () => {
  //   const result = [{ id: 1, dateString: '2023-10-10' }];

  //   (jest.spyOn(service, 'findAll') as jest.Mock).mockResolvedValue(result);

  //   expect(await resolver.findAll()).toEqual(result);
  // });

  // it('should update an appointment', async () => {
  //   const updateAppointmentInput = { id: 1, dateString: '2023-10-11' };
  //   const result = { id: 1, ...updateAppointmentInput };

  //   (jest.spyOn(service, 'update') as jest.Mock).mockResolvedValue(result);

  //   expect(await resolver.updateAppointment(updateAppointmentInput)).toEqual(result);
  // });

  // it('should remove an appointment', async () => {
  //   const result = { id: 1 };

  //   (jest.spyOn(service, 'remove') as jest.Mock).mockResolvedValue(result);

  //   expect(await resolver.removeAppointment(1)).toEqual(result);
  // });
});