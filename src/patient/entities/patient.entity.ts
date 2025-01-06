import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Patient {

  @Field(() => Int)
  id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  allergies?: string;

  @Field(() => String)
  phone: string;
  
  @Field(() => String, { nullable: true })
  phone2?: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  gender: string;

  @Field(() => Float)
  birth: number;

  @Field(() => String)
  birthString: string;


  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Boolean)
  isDeleted: boolean;

  @Field(() => Int)
  doctorId: number;

  @Field(() => Date)
  createdAt: Date;

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

  // @Field(() => [Appointment])
  // appointments: Appointment[];

  // @Field(() => User)
  // user: User;
}