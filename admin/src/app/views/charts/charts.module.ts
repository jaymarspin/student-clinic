import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule, CardModule, GridModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { ChartsComponent } from './charts.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { AddOrEditUserComponent } from './add-or-edit-user/add-or-edit-user.component';
import { FormModule } from '@coreui/angular';
@NgModule({
  declarations: [ChartsComponent, AddOrEditUserComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    FormModule,
    BadgeModule,
    DocsComponentsModule,
  ],
})
export class ChartsModule {}
