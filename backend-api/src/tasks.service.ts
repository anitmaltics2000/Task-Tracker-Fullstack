import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

export interface Task {
  id: number;
  text: string;
  day: string;
  reminder: boolean;
  completed: boolean;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  create(createTaskDto: CreateTaskDto) {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...createTaskDto, completed: false };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.findOne(id);
    const index = this.tasks.indexOf(task);
    const updatedTask = { ...task, ...updateTaskDto };
    this.tasks[index] = updatedTask;
    return updatedTask;
  }

  remove(id: number) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks.splice(index, 1);
    return { success: true };
  }
}