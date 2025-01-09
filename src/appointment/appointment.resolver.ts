import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AppointmentService } from './appointment.service';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ContextUser } from 'src/auth/entities/auth.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Resolver(() => Appointment)
@UseGuards( JwtAuthGuard )
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Query(() => Appointment, { name: 'appointmentFindById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.appointmentService.findOne(id);
  }

  @Query(() => [Appointment], { name: 'appointmentFindAll' })
  findAll() {
    return this.appointmentService.findAll();
  }

  @Mutation(() => Boolean, { name: 'appointmentCreate' })
  createAppointment(
    @Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput,
    @CurrentUser(/* [ValidRoles.admin] */) user: ContextUser,
  ) {
    return this.appointmentService.create(createAppointmentInput, user);
  }

  @Mutation(() => Boolean, { name: 'appointmentUpdate' })
  updateAppointment(@Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput) {
    return this.appointmentService.update(updateAppointmentInput.id, updateAppointmentInput);
  }

  @Mutation(() => Boolean, { name: 'appointmentDelete' })
  removeAppointment(@Args('id', { type: () => Int }) id: number) {
    return this.appointmentService.remove(id);
  }
}
