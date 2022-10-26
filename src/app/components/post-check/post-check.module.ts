import { PostCheckComponent } from './post-check/post-check.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCheckRoutingModule } from './post-check-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TablesRoutingModule } from '../tables/tables-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    PostCheckComponent,
  ],
  imports: [
    CommonModule,
    PostCheckRoutingModule,
    CommonModule,
    TablesRoutingModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    SharedModule,
  ]
})
export class PostCheckModule { }
