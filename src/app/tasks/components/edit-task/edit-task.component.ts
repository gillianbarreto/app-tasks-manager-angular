import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { TasksHelper } from '../../services/tasks.helper';
import { ModalService } from '@core/services';
import { ModalComponent } from '@common/components/modal/modal.component';
import { validFormat } from '@common/utils';
import { SharedModule } from '@common/components/shared.module';
import { Task } from '../../models/task';

@Component({
  standalone: true,
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  imports: [ FormsModule, ReactiveFormsModule, ModalComponent, SharedModule ]
})
export class EditTaskComponent implements OnInit {

  @Input() taskId!: number | null;
  @Input() titleModal: string = "";

  public taskForm!: FormGroup;
  private task!: Task;

  public tasksHelper = inject(TasksHelper);
  private modalService = inject(ModalService);
  private formBuilder = inject(FormBuilder);

 async ngOnInit(): Promise<void> {
    this.task = await this.tasksHelper.getTaskById(this.taskId);
    this.configForm();
    this.initModal();
  }

  configForm() {
    this.taskForm = this.formBuilder.group({
      "title": [this.task.title, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(validFormat.ONLY_LETTERS)]],
      "description": [this.task.description, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });
  }

  saveTask() {
    if (!this.taskForm.valid) return;
    this.modalService.closeModal();
    this.hideModal();

    const data = this.taskForm.value;
    this.tasksHelper.saveTask(this.taskId, data.title, data.description);
    this.tasksHelper.completeTask(false);
  }

  initModal() {
    this.modalService.initModal('modal');
    this.modalService.showModal();
  }

  hideModal() {
    this.tasksHelper.showModal = false;
  }
}
