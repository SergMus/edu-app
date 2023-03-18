import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsComponent } from './lessons.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LessonsComponent,
  },
];

@NgModule({
  declarations: [LessonsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    RouterModule.forChild(routes),
  ],
  exports: [LessonsComponent, RouterModule],
})
export class LessonsModule {}
