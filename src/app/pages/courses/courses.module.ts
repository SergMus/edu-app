import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CoursesComponent } from './courses.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
];

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    RouterModule.forChild(routes),
  ],
  exports: [CoursesComponent, RouterModule],
})
export class CoursesModule {}
