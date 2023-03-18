import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap, of } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'https://api.wisey.app/api/v1';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public getAuthToken(): Observable<null> {
    return this.http
      .get(`${this.apiUrl}/auth/anonymous?platform=subscriptions`)
      .pipe(
        concatMap((token: any) => {
          this.tokenService.setToken(token.token);
          return of(null);
        })
      );
  }
}
