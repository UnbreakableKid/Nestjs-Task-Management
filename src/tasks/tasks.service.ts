import { Injectable } from '@nestjs/common';
import { Task, TasksStatus } from './task.model';
import * as uuid from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string) {
    const task: Task = {
      id: uuid.v1(),
      title,
      description,
      status: TasksStatus.OPEN,
    };
  }
}
