import { Injectable } from '@angular/core';

declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private myModal: any;

  public initModal(modal: string) {
    this.myModal = new window.bootstrap.Modal(document.getElementById(modal));
  }

  public showModal(): void {
    this.myModal.show();
  }

  public closeModal(): void {
    this.myModal.hide();
  }
}
