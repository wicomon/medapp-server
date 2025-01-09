import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Appointment {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  dateString: string;

  @Field(() => Float)
  startTime: number;

  @Field(() => Float)
  endTime: number;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  notes?: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  patientId: number;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Float)
  createdAt: number;

  @Field(() => Int, { nullable: true })
  createdBy?: number;

  @Field(() => Float, { nullable: true })
  updatedAt?: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;

  @Field(() => Float, { nullable: true })
  deletedAt?: number;

  @Field(() => Int, { nullable: true })
  deletedBy?: number;
}

// id
// date
// startTime
// endTime
// userId
// patientId
// status
// createdAt
// createdBy
// updatedAt
// updatedBy
// deletedAt
// deletedBy
