import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
   
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  
  ]
})

export class AngularMaterialModule {}