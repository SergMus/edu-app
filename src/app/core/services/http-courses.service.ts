import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  Subject,
  take,
  throwError,
} from 'rxjs';
import { Course, Courses } from '../models/courses.interface';
import { CourseLessons } from '../models/lessons.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpCoursesService {
  private readonly apiUrl: string = 'https://api.wisey.app/api/v1';
  public coursesCount$: Subject<number> = new BehaviorSubject(0);

  constructor(private http: HttpClient) {}

  public getCourses(pageNumber = 0, pageSize = 10): Observable<Course[]> {
    const url = `${this.apiUrl}/core/preview-courses`;

    return this.http.get<Courses>(url).pipe(
      map((course) => {
        this.coursesCount$.next(course.courses.length);

        return course.courses;
      }),
      map((courses) =>
        courses.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize)
      ),
      catchError(this.handleError)
    );
  }

  public getCourseById(courseId: string): Observable<CourseLessons> {
    const url = `${this.apiUrl}/core/preview-courses/${courseId}`;

    return this.http.get<CourseLessons>(url).pipe(catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    errorMessage =
      error.error instanceof ErrorEvent
        ? error.error.message
        : `Error code: ${error.status}\nMessage: ${error.message}`;

    return throwError((): string => errorMessage);
  }
}
