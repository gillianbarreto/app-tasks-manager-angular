import { Injectable } from '@angular/core';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private myModal: any;

  initModal(modal: string) {
    this.myModal = new window.bootstrap.Modal(
      document.getElementById(modal)
    );
  }

  showModal() {
    this.myModal.show();
  }

  closeModal() {
    this.myModal.hide();
  }

}
