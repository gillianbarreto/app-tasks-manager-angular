import { Component } from '@angular/core';
import { environment } from '@environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  private date = new Date();
  public year = this.date.getFullYear();
  public appName = environment.APP_NAME;

  constructor() { }

}
