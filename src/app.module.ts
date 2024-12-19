import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // load: [EnvVaribales]
      isGlobal: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // rootValue: '/',
      path: '/',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // formatError: (err) => ({
      //   message: err.message,
      //   // status: err.extensions.code,
      //   // extensions: err.extensions,
      //   error: err.extensions.originalError['error'],
      //   code: err.extensions.originalError['statusCode'],
      //   originalMessage: err.extensions.originalError['message'],
      // }),
    }),

    AuthModule,
    CommonModule,
    UserModule,
  ]
})
export class AppModule {}
