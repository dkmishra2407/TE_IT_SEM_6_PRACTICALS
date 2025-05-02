import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, LoginCredentials, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly USERS_KEY = 'users';
  private readonly CURRENT_USER_KEY = 'currentUser';
  private users: User[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedUsers = localStorage.getItem(this.USERS_KEY);
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      }

      const storedUser = localStorage.getItem(this.CURRENT_USER_KEY);
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    }
  }

  private saveUsers(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(this.users));
    }
  }

  register(user: User): Observable<AuthResponse> {
    if (this.users.some(u => u.email === user.email)) {
      return new Observable(subscriber => {
        subscriber.error({ error: { message: 'User with this email already exists' } });
      });
    }

    this.users.push(user);
    this.saveUsers();

    const response: AuthResponse = {
      token: 'dummy-token-' + Date.now(),
      user: user
    };

    return of(response).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);
          localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(response.user));
        }
        this.currentUserSubject.next(response.user);
      })
    );
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    const user = this.users.find(u => u.email === credentials.email && u.password === credentials.password);

    if (!user) {
      return new Observable(subscriber => {
        subscriber.error({ error: { message: 'Invalid email or password' } });
      });
    }

    const response: AuthResponse = {
      token: 'dummy-token-' + Date.now(),
      user: user
    };

    return of(response).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);
          localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(response.user));
        }
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
} 