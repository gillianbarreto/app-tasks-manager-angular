import { Injectable, inject } from '@angular/core';

import { Task } from '../models/task';
import { TasksService } from './tasks.service';
import { KEYS, SessionService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class TasksHelper {

  public showModal: boolean = false;

  private _tasksList: Task[] = [];
  private _allCompleted: boolean = false;
  private _tasksService = inject(TasksService);
  private _sessionService = inject(SessionService);

  get tasksList(): Task[] {
    return this._tasksList;
  }

  set tasksList(tasksList: Task[]) {
    this._tasksList = tasksList;
  }

  get allCompleted(): boolean {
    return this._allCompleted;
  }

  set allCompleted(allCompleted: boolean) {
    this._allCompleted = allCompleted;
  }

  getTaskById(taskId: number | null): Task {
    if (!taskId) return this.initTask();
    const task = this._tasksList.find(task => task.id == taskId)
    if (!task) return this.initTask();
    return task;
  }

  initTask(): Task {
    return {
      id: 0,
      title: '',
      description: '',
      completed: false,
      userId: 0,
    }
  }

  getTasksList() {
    this._tasksList = [];
    const userId = this._sessionService.getData(KEYS.user);
    this._tasksService.getTasksList(userId).subscribe(response => {
      this.tasksList = response.getPayload().tasks;
      this.setAllCompletedTask();
    });
  }

  setAllCompletedTask() {
    this._allCompleted = (this._tasksList.findIndex(task => task.completed == false) < 0);
  }

  completedAll() {
    this._tasksList = this._tasksList.map(task => {
      task.completed = this._allCompleted;
      return task;
    });
  }

  completeTask(completed: boolean) {
    if (!completed) {
      this._allCompleted = false;
    } else if (!this._allCompleted) {
      this.setAllCompletedTask();
    }
  }

  saveTask(taskId: number | null, title: string, description: string) {
    if (taskId) this.updateTask(taskId, title, description);
    else this.createTask(title, description);
  }

  createTask(title: string, description: string) {
    const id = this._tasksList.length + 1;
    this._tasksList.push({
      id,
      title,
      description,
      completed: false,
      userId: this._sessionService.getData(KEYS.user),
    })
  }

  updateTask(taskId: number, title: string, description: string) {
    const index = this._tasksList.findIndex(task => task.id == taskId);
    if (index > 0) {
      this._tasksList[index].title = title;
      this._tasksList[index].description = description;
    }
  }

  deleteTask(id: number) {
    this._tasksList = this._tasksList.filter(task => task.id !== id);
  }
}
