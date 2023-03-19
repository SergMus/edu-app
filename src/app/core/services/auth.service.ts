import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, concatMap, of, catchError } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'https://api.wisey.app/api/v1';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  public getAuthToken(): Observable<boolean | null> {
    return this.http
      .get(`${this.apiUrl}/auth/anonymous?platform=subscriptions`)
      .pipe(
        concatMap((token: any) => {
          this.tokenService.setToken(token.token);
          return of(null);
        }),
        catchError(() => {
          this.router.navigate(['/login']);
          return of(false);
        })
      );
  }
}
