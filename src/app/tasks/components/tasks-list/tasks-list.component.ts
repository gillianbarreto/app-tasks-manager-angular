import { Component, OnInit } from '@angular/core';

import { KEYS, SessionService } from '@services';
import { Task } from '../../models/task';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  public tasksList: Task[] = [];

  constructor(
    private tasksService: TasksService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.getTasksList();
  }

  getTasksList() {
    this.tasksList = [];
    const user_id = this.sessionService.getData(KEYS.user);
    this.tasksService.getTasksList(user_id).subscribe(response => {
      this.tasksList = response.getPayload().tasks;
    });
  }

  changeStatus(event: any, task: number) {

  }

  addTask() {

  }

  editTask(id: number) {

  }

  deleteTask(id: number) {
    this.tasksList = this.tasksList.filter(item => item.id === id);
  }

}
