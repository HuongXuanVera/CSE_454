
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportDataComponent } from './report-data/report-data.component';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'report-data',
        component: ReportDataComponent
      },
      {
        path: 'vehicle-info',
        component: VehicleInfoComponent
      },
    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }