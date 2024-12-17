import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";

@InputType()
export class RestorePasswordInput{

  @Field(() => String)
  @IsString()
  nickName: string;

}