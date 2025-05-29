import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ModalService } from '@core/services';
import { ModalComponent } from '@common/components/modal/modal.component';
import { validFormat } from '@common/utils';
import { Task } from '../../models/task';
import { TASK_LABELS } from '../../content';
import { TasksHelper } from '../../services/tasks.helper';
import { FormErrorsComponent } from '@common/components/form-errors/form-errors.component';

@Component({
  standalone: true,
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalComponent,
    FormErrorsComponent,
  ],
})
export class EditTaskComponent implements OnInit {
  @Input() taskId!: string | null;
  @Input() modalTitle = '';

  public labels = TASK_LABELS;
  public taskForm!: FormGroup;
  private task!: Task;
  public completedTask = false;

  public tasksHelper = inject(TasksHelper);
  private modalService = inject(ModalService);
  private formBuilder = inject(FormBuilder);

  async ngOnInit(): Promise<void> {
    this.task = await this.tasksHelper.getTaskById(this.taskId);
    this.completedTask = this.task.completed;
    this.configForm();
    this.initModal();
  }

  private configForm(): void {
    this.taskForm = this.formBuilder.group({
      title: [
        this.task.title,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(validFormat.ONLY_LETTERS),
        ],
      ],
      description: [
        this.task.description,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  public saveTask(): void {
    if (!this.taskForm.valid) return;
    this.modalService.closeModal();
    this.hideModal();

    const data = this.taskForm.value;
    this.tasksHelper.saveTask(this.taskId, data.title, data.description);
    this.tasksHelper.allCompleted = false;
  }

  private initModal(): void {
    this.modalService.initModal('modal');
    this.modalService.showModal();
  }

  public hideModal(): void {
    this.tasksHelper.showModal = false;
    this.modalService.closeModal();
  }
}
