import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { SessionService } from '@services';
import { ModalErrorComponent } from '@common/components/modal-error/modal-error.component';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    ModalErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
