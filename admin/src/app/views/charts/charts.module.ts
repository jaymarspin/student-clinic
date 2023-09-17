import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { BadgeModule, CardModule, GridModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { ChartsComponent } from './charts.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { AddOrEditUserComponent } from './add-or-edit-user/add-or-edit-user.component';
import { FormModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HttpClient } from '@angular/common/http'; 
import {MomentjsPipe} from '../../pipes/momentjs/momentjs.pipe'
@NgModule({
  declarations: [ChartsComponent, AddOrEditUserComponent,MomentjsPipe],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    HttpClientModule,
    FormModule,
    FormsModule, 
    BadgeModule,
    DocsComponentsModule,
  ],providers:[HttpClient]
})
export class ChartsModule {}
