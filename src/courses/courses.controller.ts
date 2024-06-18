import { Controller, Get, Post, Body, Param, Delete, Put,NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Course> {
    const course = await this.coursesService.findOne(id);
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  @Post()
  create(@Body() course: Course): Promise<Course> {
    return this.coursesService.create(course);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() course: Course): Promise<Course> {
    return this.coursesService.update(id, course);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.coursesService.remove(id);
  }
}

