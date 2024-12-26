import { inject, Injectable, signal } from '@angular/core';
import { AuthResponse, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { finalize, from, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  currentUser = signal<string | null>(null);

  handleAuthStateChange() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this.currentUser.set(session?.user.email ?? null);
        this.router.navigateByUrl('/');
      } else if (event === 'SIGNED_OUT') {
        this.currentUser.set(null);
        this.router.navigateByUrl('/login');
      }
    });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return from(
      this.supabase.auth.signInWithPassword({ email, password })
    ).pipe(
      tap((response) => {
        if (response.data.session?.user) {
          this.currentUser.set(response.data.session.user.email ?? null);
          this.router.navigateByUrl('/');
        }
      })
    );
  }
  setCurrentUser(currentUser: string | null) {
    this.currentUser.set(currentUser);
  }

  logout() {
    from(this.supabase.auth.signOut())
      .pipe(
        tap(() => {
          this.currentUser.set(null);
        }),
        finalize(() => {
          this.router.navigateByUrl('/login');
        })
      )
      .subscribe();
  }

  getSession() {
    return from(this.supabase.auth.getSession());
  }

  initializeAuth() {
    return this.getSession().pipe(
      tap(({ data }) => {
        const isLoggedIn = !!data.session?.user;
        this.currentUser.set(data.session?.user.email ?? null);

        const isLoginPage = this.router.url === '/login';
        if (!isLoggedIn && !isLoginPage) {
          this.router.navigateByUrl('/login');
        } else if (isLoggedIn && isLoginPage) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }

  constructor() {
    this.handleAuthStateChange();
    this.initializeAuth().subscribe();
  }
}
