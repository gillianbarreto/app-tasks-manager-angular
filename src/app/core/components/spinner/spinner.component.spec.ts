import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './spinner.service';

class MockSpinnerService {
  returnSpinner() {
    return new Observable(spinner => {
      spinner.next(true);
    });
  }
}

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerComponent],
      providers: [
        {
          provide: SpinnerService,
          useClass: MockSpinnerService,
        },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.spinner).toBeTruthy();
  });
});
