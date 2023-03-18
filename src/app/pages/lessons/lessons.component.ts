import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { CourseLessons, Lesson } from 'src/app/core/models/lessons.interface';
import { HttpCoursesService } from 'src/app/core/services/http-courses.service';
import Hls from 'hls.js';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
})
export class LessonsComponent implements OnInit, AfterViewInit, OnDestroy {
  public course$?: Observable<CourseLessons>;
  public lessons$?: Observable<Lesson[]>;
  public currentLesson$?: Observable<Lesson>;
  public currentLesson?: Subscription;
  public routeParam?: string;
  public video?: HTMLVideoElement;
  public hls: any;

  constructor(
    private httpCoursesService: HttpCoursesService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.course$ = this.route.paramMap.pipe(
      map((params) => params.get('id')!),
      filter((id) => !!id),
      switchMap((id) => this.httpCoursesService.getCourseById(id)),
      shareReplay(1)
    );

    this.lessons$ = this.course$?.pipe(map((course) => course.lessons));
    this.currentLesson$ = this.course$?.pipe(
      map((course) => course.lessons[0])
    );
  }

  public onLessonClick(lesson: Lesson): void {
    this.currentLesson$ = this.course$?.pipe(
      map((course) => course.lessons.find((l) => l.id === lesson.id)),
      filter((lesson): lesson is Lesson => !!lesson)
    );
  }

  public startVideo(lesson: Lesson): void {
    this.cd.detectChanges();

    this.video = document.getElementById(
      lesson.id.toString()
    ) as HTMLVideoElement;

    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.loadSource(lesson.link);
      this.hls.attachMedia(this.video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.video?.play();
        this.video!.muted = true;
      });
    } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
      this.video.src = lesson.link;
      this.video.addEventListener('loadedmetadata', () => {
        this.video?.play();
        this.video!.muted = true;
      });
    }
  }

  public ngAfterViewInit(): void {
    this.currentLesson = this.currentLesson$?.subscribe((lesson) => {
      this.startVideo(lesson);
    });
  }

  public ngOnDestroy() {
    this.currentLesson?.unsubscribe();
  }
}
