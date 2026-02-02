import { Controller, Get, Post, Body, Param, Delete, Put, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger(TasksController.name);

  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    this.logger.log('Creating a new task');
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    this.logger.log('Fetching all tasks');
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`Fetching task ${id}`);
    return this.tasksService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    this.logger.log(`Updating task ${id}`);
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`Deleting task ${id}`);
    return this.tasksService.remove(+id);
  }
}