import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';

describe('CoursesController', () => {
  let controller: CoursesController;
  let service: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        {
          provide: CoursesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{ id: 1, title: 'Test', description: 'Test desc', duration: 5 }]),
            findOne: jest.fn().mockResolvedValue({ id: 1, title: 'Test', description: 'Test desc', duration: 5 }),
            create: jest.fn().mockResolvedValue({ id: 1, title: 'Test', description: 'Test desc', duration: 5 }),
            update: jest.fn().mockResolvedValue({ id: 1, title: 'Updated', description: 'Updated desc', duration: 10 }),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of courses', async () => {
    expect(await controller.findAll()).toEqual([{ id: 1, title: 'Test', description: 'Test desc', duration: 5 }]);
  });

  it('should return a single course', async () => {
    expect(await controller.findOne(1)).toEqual({ id: 1, title: 'Test', description: 'Test desc', duration: 5 });
  });

  it('should create a course', async () => {
    const course: Course = { id: 1, title: 'Test', description: 'Test desc', duration: 5 };
    expect(await controller.create(course)).toEqual(course);
  });

  it('should update a course', async () => {
    const course: Course = { id: 1, title: 'Updated', description: 'Updated desc', duration: 10 };
    expect(await controller.update(1, course)).toEqual(course);
  });

  it('should delete a course', async () => {
    expect(await controller.remove(1)).toBeUndefined();
  });
});

