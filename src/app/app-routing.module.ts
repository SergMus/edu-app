import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { CoursesComponent } from './pages/courses/courses.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lessons/:id',
    loadChildren: () =>
      import('./../app/pages/lessons/lessons.module').then(
        (m) => m.LessonsModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./../app/pages/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
