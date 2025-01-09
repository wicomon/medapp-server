import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateAppointmentInput {
  @Field(() => String)
  @IsString()
  dateString: string;

  @Field(() => Float)
  @IsNumber()
  startTime: number;

  @Field(() => Float)
  @IsNumber()
  endTime: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field(() => Int)
  @IsNumber()
  patientId: number;
}
