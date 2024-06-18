import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import { Course } from '../src/courses/course.entity';

describe('CoursesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Course],
          synchronize: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/courses (POST)', async () => {
    const course = { title: 'Test Course', description: 'Test Description', duration: 10 };
    const response = await request(app.getHttpServer())
      .post('/courses')
      .send(course)
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(Number),
      ...course,
    });
  });

  it('/courses (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/courses')
      .expect(200);

    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        title: 'Test Course',
        description: 'Test Description',
        duration: 10,
      },
    ]);
  });

  it('/courses/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/courses/1')
      .expect(200);

    expect(response.body).toEqual({
      id: 1,
      title: 'Test Course',
      description: 'Test Description',
      duration: 10,
    });
  });

  it('/courses/:id (PUT)', async () => {
    const updatedCourse = { title: 'Updated Course', description: 'Updated Description', duration: 15 };
    const response = await request(app.getHttpServer())
      .put('/courses/1')
      .send(updatedCourse)
      .expect(200);

    expect(response.body).toEqual({
      id: 1,
      ...updatedCourse,
    });
  });

  it('/courses/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete('/courses/1')
      .expect(200);

    // Ensure that the course is actually deleted
    await request(app.getHttpServer())
      .get('/courses/1')
      .expect(404);
  });
});
