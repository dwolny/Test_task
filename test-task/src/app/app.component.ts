import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-task';

  constructor(private translateService: TranslateService, public appService: AppService) {
    this.translateService.setDefaultLang('pl');
    this.translateService.use('pl');
    this.appService.loadConfig();
  }
}
