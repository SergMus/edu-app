import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subject } from 'rxjs';

import { Course } from 'src/app/core/models/courses.interface';
import { HttpCoursesService } from 'src/app/core/services/http-courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  public courses$?: Observable<Course[]>;
  public totalCourses$?: Subject<number>;
  public pageSize: number = 10;
  public pageNumber?: number;
  public currentPreviewVideo?: Course;
  public video?: HTMLVideoElement;

  constructor(
    private httpCoursesService: HttpCoursesService,
    public cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.getCourses();
  }

  public getCourses(): void {
    this.courses$ = this.httpCoursesService.getCourses(
      this.pageNumber,
      this.pageSize
    );
    this.totalCourses$ = this.httpCoursesService.coursesCount$;
  }

  public onPageChanged(page: PageEvent): void {
    this.pageNumber = page.pageIndex;

    this.getCourses();
  }

  public startPreviewVideo(course: Course): void {
    this.currentPreviewVideo = course;
    this.cd.detectChanges();

    this.video = document.getElementById(
      course.id.toString()
    ) as HTMLVideoElement;
    this.video?.play();
  }

  public stopPreviewVideo(): void {
    this.video?.pause();
    this.currentPreviewVideo = undefined;
  }
}
