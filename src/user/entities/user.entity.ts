import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  nickName: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String)
  password: string;

  @Field(() => Boolean)
  isActive: string;

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
