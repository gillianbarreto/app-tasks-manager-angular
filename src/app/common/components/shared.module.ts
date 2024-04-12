import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShowErrorsComponent } from './show-errors/show-errors.component';

const components = [
  HeaderComponent,
  FooterComponent,
  ShowErrorsComponent
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [...components],
  exports: [...components]
})
export class SharedModule { }