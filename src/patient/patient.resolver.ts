import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientService } from './patient.service';
import { Patient } from './entities/patient.entity';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ContextUser } from 'src/auth/entities/auth.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Resolver(() => Patient)
@UseGuards( JwtAuthGuard )
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  
  @Query(() => [Patient], { name: 'patientFindAll' })
  findAll(@Args('id', { type: () => Int }) id: number) {
    return this.patientService.findAll(id);
  }
  
  @Query(() => Patient, { name: 'patientFindById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.patientService.findOne(id);
  }

  @Mutation(() => Boolean, { name: 'patientCreate' })
  createPatient(
    @Args('createPatientInput') createPatientInput: CreatePatientInput,
    @CurrentUser(/* [ValidRoles.admin] */) user: ContextUser,
  ) {
    return this.patientService.create(createPatientInput, user);
  }

  @Mutation(() => Boolean, { name: 'patientUpdate' })
  updatePatient(
    @Args('updatePatientInput') updatePatientInput: UpdatePatientInput,
    @CurrentUser(/* [ValidRoles.admin] */) user: ContextUser,
  ) {
    return this.patientService.update(updatePatientInput.id, updatePatientInput, user);
  }

  @Mutation(() => Boolean, { name: 'patientDelete' })
  removePatient(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser(/* [ValidRoles.admin] */) user: ContextUser,
  ) {
    return this.patientService.remove(id, user);
  }
}
