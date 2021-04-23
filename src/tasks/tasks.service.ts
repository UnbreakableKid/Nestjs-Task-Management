import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TasksStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((x) => x.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (x) => x.title.includes(search) || x.title.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((x) => x.id === id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid.v1(),
      title,
      description,
      status: TasksStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TasksStatus): Task {
    const toUpdate = this.getTaskById(id);
    toUpdate.status = status;
    return toUpdate;
  }

  deleteTask(id: string): Task {
    const toRemove = this.getTaskById(id);
    this.tasks = this.tasks.filter((x) => x.id != id);
    return toRemove;
  }
}
