import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesRoutingModule } from './tables-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbTableComponent } from './data_table_components/ngb-table/ngb-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular material table
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportDataComponent } from './report-data/report-data.component';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    NgbTableComponent,
    ReportDataComponent,
    VehicleInfoComponent,
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    SharedModule,
    NgSelectModule,
  ],
})
export class TablesModule {}
