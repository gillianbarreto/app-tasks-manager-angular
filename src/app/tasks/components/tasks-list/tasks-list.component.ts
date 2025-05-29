import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Task } from '../../models/task';
import { TasksHelper } from '../../services/tasks.helper';
import { TASK_LABELS, TASK_MESSAGE } from '../../content';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

@Component({
  standalone: true,
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    DeleteTaskComponent,
  ],
})
export class TasksListComponent implements OnInit {
  @Output() addTask: EventEmitter<void> = new EventEmitter<void>();
  @Output() editTask: EventEmitter<string> = new EventEmitter<string>();

  public labels = TASK_LABELS;
  public emptyListMessage = TASK_MESSAGE.emptyList;

  public tasksHelper = inject(TasksHelper);

  ngOnInit(): void {
    this.tasksHelper.getTasksList();
  }

  public onCompletedAll(): void {
    this.tasksHelper.completedAll();
  }

  public onCompleteTask(task: Task): void {
    this.tasksHelper.completeTask(task);
  }

  public onAddTask(): void {
    this.addTask.emit();
  }

  public onEditTask(taskId: string): void {
    this.editTask.emit(taskId);
  }

  public onDeleteTask(taskId: string): void {
    this.tasksHelper.selectedTaskId = taskId;
    this.tasksHelper.showConfirmModal.set(true);
  }
}
