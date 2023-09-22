import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreUIIconsComponent } from './coreui-icons.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'reports'
      },
      {
        path: 'reports',
        component: CoreUIIconsComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'brands',
        component: CoreUIIconsComponent,
        data: {
          title: 'Brands'
        }
      },
      {
        path: 'flags',
        component: CoreUIIconsComponent,
        data: {
          title: 'Flags'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule {
}
