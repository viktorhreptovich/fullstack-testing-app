import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as process from 'node:process';
import { setTimeout } from 'timers/promises';

describe('AppController 2 (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    // const moduleFixture: TestingModule = await Test.createTestingModule({
    //   imports: [AppModule],
    // }).compile();
    //
    // app = moduleFixture.createNestApplication();
    // await app.init();
    process.env.PORT = '3002';
  });

  it('worker 2', async () => {
    console.log('worker 2: ', process.env.PORT);
    process.env.PORT = '3003';
    await setTimeout(1000);
    console.log('worker 2 end: ', process.env.PORT);
  });
});
