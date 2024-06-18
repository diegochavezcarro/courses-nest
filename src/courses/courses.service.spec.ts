import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';

describe('CoursesService', () => {
  let service: CoursesService;
  let repository: Repository<Course>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Course),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    repository = module.get<Repository<Course>>(getRepositoryToken(Course));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of courses', async () => {
    const result = [{ id: 1, title: 'Test', description: 'Test desc', duration: 5 }];
    jest.spyOn(repository, 'find').mockResolvedValue(result);

    expect(await service.findAll()).toBe(result);
  });

  it('should return a single course', async () => {
    const result = { id: 1, title: 'Test', description: 'Test desc', duration: 5 };
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);

    expect(await service.findOne(1)).toBe(result);
  });

  it('should create a course', async () => {
    const result = { id: 1, title: 'Test', description: 'Test desc', duration: 5 };
    jest.spyOn(repository, 'save').mockResolvedValue(result);

    expect(await service.create(result)).toBe(result);
  });

  it('should update a course', async () => {
    const course = { id: 1, title: 'Updated', description: 'Updated desc', duration: 10 };
    jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(course);

    expect(await service.update(1, course)).toBe(course);
  });

  it('should delete a course', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

    expect(await service.remove(1)).toBeUndefined();
  });
});
