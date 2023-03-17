import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CoursesComponent } from './courses.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, MatCardModule, MatPaginatorModule],
  exports: [CoursesComponent],
})
export class CoursesModule {}
