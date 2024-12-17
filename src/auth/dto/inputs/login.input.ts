import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsString, MinLength } from "class-validator";

@InputType()
export class LoginInput{

  @Field(() => String)
  @IsString()
  nickName: string;

  @Field(() => String)
  @MinLength(5,{message: 'Contraseña debe ser mínimo de 5 digitos'})
  password: string;

  @Field(() => Int)
  @IsNumber()
  idCompany: number
}