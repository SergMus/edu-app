import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subject } from 'rxjs';
import Hls from 'hls.js';

import { Course } from 'src/app/core/models/courses.interface';
import { HttpCoursesService } from 'src/app/core/services/http-courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {
  public courses$?: Observable<Course[]>;
  public totalCourses$?: Subject<number>;
  public pageSize: number = 10;
  public pageNumber?: number;
  public video?: HTMLVideoElement;
  public hls: any;

  constructor(
    private httpCoursesService: HttpCoursesService,
    public cd: ChangeDetectorRef,
    public router: Router
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

  public startPreviewVideo(course: Course, event: MouseEvent): void {
    this.cd.detectChanges();

    this.video = event.target as HTMLVideoElement;

    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.loadSource(course.meta?.courseVideoPreview?.link);
      this.hls.attachMedia(this.video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.video?.play();
        this.video!.muted = true;
      });
    } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
      this.video.src = course.meta!.courseVideoPreview.link;
      this.video.addEventListener('loadedmetadata', () => {
        this.video?.play();
        this.video!.muted = true;
      });
    }
  }

  public stopPreviewVideo(): void {
    this.video?.load();
  }
}
