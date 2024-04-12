import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { httpInterceptorProviders } from './interceptors';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    SpinnerComponent],
  imports: [CommonModule],
  exports: [
    SpinnerComponent
  ],
  providers: [httpInterceptorProviders]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has been already imported.');
    }
  }
}
