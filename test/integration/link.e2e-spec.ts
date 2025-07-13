import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/modules/app/app.module';
import { CreateLinkDto } from 'src/modules/link/dto/create-link.dto';
import * as request from 'supertest';
import { App } from 'supertest/types';

describe('Link (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should create a Link', () => {
    const createLinkPayload: CreateLinkDto = {
      sourceURl: 'https://example.com',
    };

    return request(app.getHttpServer())
      .post('/link')
      .send(JSON.stringify(createLinkPayload))
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.redirectUrl).toBeDefined();
      });
  });
});
