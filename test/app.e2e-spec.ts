import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('GraphQL API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('serves Apollo Sandbox', () => {
    return request(app.getHttpServer())
      .get('/graphql')
      .set('accept', 'text/html')
      .expect(200)
      .expect('content-type', /html/);
  });

  afterEach(async () => {
    await app.close();
  });
});
