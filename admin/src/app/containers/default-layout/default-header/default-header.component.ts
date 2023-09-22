import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-default-header',
  styleUrls: ['./default-header.component.scss'],
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);

  constructor( 
    private spinner: NgxSpinnerService,
    private cookieService: CookieService
  ) {
    super();
  }

  async logout() {
    await this.spinner.show();
    this.cookieService.deleteAll();
    await this.spinner.hide();
    window.location.reload();
  }
}
