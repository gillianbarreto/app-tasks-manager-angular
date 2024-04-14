import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';

import { TasksHelper } from '../../services/tasks.helper';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@common/components/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  imports: [ CommonModule, FormsModule, SharedModule]
})
export class TasksListComponent implements OnInit {

  @Output() onAddTask: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEditTask: EventEmitter<number> = new EventEmitter<number>();

  public tasksHelper = inject(TasksHelper);

  ngOnInit(): void {
    this.tasksHelper.getTasksList();
  }

  completedAll() {
    this.tasksHelper.completedAll();
  }

  completeTask(completed: boolean) {
    this.tasksHelper.completeTask(completed);
  }

  addTask() {
    this.onAddTask.emit();
  }

  editTask(id: number) {
    this.onEditTask.emit(id);
  }

  deleteTask(id: number) {
    this.tasksHelper.deleteTask(id);
  }

}
