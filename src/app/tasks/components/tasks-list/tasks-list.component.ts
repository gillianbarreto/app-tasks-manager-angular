import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';

import { TasksHelper } from '../../services/tasks.helper';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@common/components/shared.module';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';

@Component({
  standalone: true,
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  imports: [ CommonModule, FormsModule, SharedModule]
})
export class TasksListComponent implements OnInit {

  @Output() onAddTask: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEditTask: EventEmitter<string> = new EventEmitter<string>();

  public tasksHelper = inject(TasksHelper);

  ngOnInit(): void {
    this.tasksHelper.getTasksList();
  }

  completedAll() {
    this.tasksHelper.completedAll();
  }

  completeTask(task: Task) {
    this.tasksHelper.completeTask(task);
  }

  addTask() {
    this.onAddTask.emit();
  }

  editTask(taskId: string) {
    this.onEditTask.emit(taskId);
  }

  deleteTask(taskId: string) {
    this.tasksHelper.deleteTask(taskId);
  }

}
