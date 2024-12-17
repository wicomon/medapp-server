import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';

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
}
