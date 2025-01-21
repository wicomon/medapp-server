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
  dni: string;

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

  @Field(() => String, { nullable: true })
  @IsOptional()
  allergies?: string;

  @Field(() => String)
  @IsString()
  phone: string;
  
  @Field(() => String, { nullable: true })
  @IsOptional()
  phone2?: string;

  @Field(() => String)
  @IsString()
  address: string;

  @Field(() => String)
  @IsString()
  gender: string;
}
