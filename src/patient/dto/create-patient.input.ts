import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class CreatePatientInput {

  @Field(() => String)
  @IsString()
  firstName: string;

  @Field(() => String)
  @IsString()
  lastName: string;

  @Field(() => String)
  @IsString()
  email: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  image?: string;

  @Field(() => Float)
  @IsNumber()
  birth: number;
  
  @Field(() => String)
  @IsString()
  birthString: string;
}
