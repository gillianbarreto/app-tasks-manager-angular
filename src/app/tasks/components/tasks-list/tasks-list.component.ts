import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Task } from '../../models/task';
import { TasksHelper } from '../../services/tasks.helper';
import { TASK_LABELS, TASK_MESSAGE } from '../../content';
import { SharedModule } from '@common';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

@Component({
  standalone: true,
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  imports: [CommonModule, FormsModule, SharedModule, DeleteTaskComponent],
})
export class TasksListComponent implements OnInit {
  @Output() onAddTask: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEditTask: EventEmitter<string> = new EventEmitter<string>();

  public labels = TASK_LABELS;
  public emptyListMessage = TASK_MESSAGE.emptyList;

  public tasksHelper = inject(TasksHelper);

  ngOnInit(): void {
    this.tasksHelper.getTasksList();
  }

  public completedAll(): void {
    this.tasksHelper.completedAll();
  }

  public completeTask(task: Task): void {
    this.tasksHelper.completeTask(task);
  }

  public addTask(): void {
    this.onAddTask.emit();
  }

  public editTask(taskId: string): void {
    this.onEditTask.emit(taskId);
  }

  public deleteTask(taskId: string): void {
    this.tasksHelper.selectedTaskId = taskId;
    this.tasksHelper.showConfirmModal = true;
  }
}
