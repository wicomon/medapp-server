import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  firstName: string;

  @Field(() => String)
  @IsString()
  lastName: string;

  @Field(() => String)
  @IsString()
  nickName: string;

  @Field(() => String)
  @IsString()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  image?: string;

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  rolId: number;
}
