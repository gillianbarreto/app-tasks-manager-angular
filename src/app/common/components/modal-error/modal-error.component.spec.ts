import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ModalErrorComponent } from './modal-error.component';

describe('ModalErrorComponent', () => {
  let component: ModalErrorComponent;
  let fixture: ComponentFixture<ModalErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalErrorComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
