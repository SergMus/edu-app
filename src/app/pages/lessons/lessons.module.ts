import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsComponent } from './lessons.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { PlaybackRateControlDirective } from 'src/app/core/directives/playback-rate-control.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LessonsComponent,
  },
];

@NgModule({
  declarations: [LessonsComponent, PlaybackRateControlDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    RouterModule.forChild(routes),
  ],
  exports: [LessonsComponent, RouterModule],
})
export class LessonsModule {}
