import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, catchError, map } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'https://api.wisey.app/api/v1';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public isAuthenticated(): Observable<boolean> {
    return this.http
      .get(`${this.apiUrl}/auth/anonymous?platform=subscriptions`)
      .pipe(
        map((token: any) => {
          this.localStorageService.setItem('token', token.token);
          return true;
        }),
        catchError(() => {
          this.router.navigate(['/login']);
          return of(false);
        })
      );
  }
}
