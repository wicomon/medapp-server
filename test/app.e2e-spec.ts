import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('GraphQL API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be able to query the GraphQL endpoint', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
        query: '{ __schema { types { name } } }'  // Simple introspection query
      })
      .expect(200);
  });
});