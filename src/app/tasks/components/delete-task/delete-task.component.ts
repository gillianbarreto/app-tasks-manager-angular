import { Component, OnInit, inject } from '@angular/core';

import { ModalService } from '@core/services';
import { ModalComponent } from '@common/components/modal/modal.component';
import { TASK_MESSAGE, TASK_TITLE } from '../../content';
import { TasksHelper } from '../../services/tasks.helper';

@Component({
  standalone: true,
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  imports: [ModalComponent],
})
export class DeleteTaskComponent implements OnInit {
  public title = TASK_TITLE.deleteTask;
  public message = TASK_MESSAGE.deleteTask;

  public tasksHelper = inject(TasksHelper);
  private modalService = inject(ModalService);

  ngOnInit(): void {
    this.initModal();
  }

  private initModal(): void {
    this.modalService.initModal('modal');
    this.modalService.showModal();
  }

  public deleteTask(): void {
    this.tasksHelper.deleteTask();
    this.hideModal();
  }

  public hideModal(): void {
    this.tasksHelper.showConfirmModal.set(false);
    this.modalService.closeModal();
  }
}
