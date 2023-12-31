import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { ButtonsComponent } from './buttons/buttons.component';
import { ButtonGroupsComponent } from './button-groups/button-groups.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';

import { ButtonsRoutingModule } from './buttons-routing.module';
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  NavbarModule,
  NavModule,
  SharedModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';
import { AddOrEditMedicineComponent } from './add-or-edit-medicine/add-or-edit-medicine.component';
import { AddStocksComponent } from './add-stocks/add-stocks.component';
import { StocksPipe } from 'src/app/pipes/stocks/stocks.pipe';
import { StocksGetPipe } from 'src/app/pipes/stocksGet/stocks-get.pipe';
import { CountStocksPipe } from 'src/app/pipes/count-stocks/count-stocks.pipe';
@NgModule({
  declarations: [
    ButtonsComponent,
    ButtonGroupsComponent,
    StocksGetPipe,
    DropdownsComponent,
    AddOrEditMedicineComponent,
    AddStocksComponent,
    StocksPipe,
    CountStocksPipe,
  ],
  imports: [
    CommonModule,
    ButtonsRoutingModule,
    ButtonModule,
    ButtonGroupModule,
    GridModule,
    IconModule,
    CardModule,
    UtilitiesModule,
    DropdownModule,
    SharedModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    DocsComponentsModule,
    NavbarModule,
    CollapseModule,
    NavModule,
    NavbarModule,
  ],
})
export class ButtonsModule {}
