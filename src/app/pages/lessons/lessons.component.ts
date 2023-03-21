import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('video') video?: ElementRef;
  public course$?: Observable<CourseLessons>;
  public lessons$?: Observable<Lesson[]>;
  public currentLesson$?: Observable<Lesson>;
  public currentLesson?: Subscription;
  public routeParam?: string;
  public playbackRate?: number;
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
    this.startVideo(lesson);
  }

  public startVideo(lesson: Lesson): void {
    this.cd.detectChanges();
    const video = this.video?.nativeElement;

    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.loadSource(lesson.link);
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
        video.muted = true;
        this.playbackRate = video.playbackRate;
        this.updatePlaybackRate(video);
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = lesson.link;
      video.addEventListener('loadedmetadata', () => {
        video.play();
        video.muted = true;
        this.playbackRate = video.playbackRate;
      });
      this.updatePlaybackRate(video);
    }
  }

  public updatePlaybackRate(video: HTMLVideoElement): void {
    video.addEventListener('ratechange', () => {
      this.playbackRate = video.playbackRate;
    });
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
