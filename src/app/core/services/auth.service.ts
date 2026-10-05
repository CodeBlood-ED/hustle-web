import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import {
  AddressDto,
  AuthResponse,
  CreateAddressRequest,
  CreateEnquiryRequest,
  EnquiryDto,
  LoginRequest,
  SignupRequest,
  UpdateProfileRequest,
  UserProfileDto,
  UserResponse
} from '../models/auth.model';

const TOKEN_KEY = 'hustle_auth_token';
const USER_KEY = 'hustle_auth_user';
const PROFILE_SESSION_KEY = 'hustle_user_profile_session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly authUrl = `${environment.apiUrl}/auth`;
  private readonly userUrl = `${environment.apiUrl}/user`;

  private readonly tokenState = signal<string | null>(this.readStoredToken());
  private readonly userState = signal<UserResponse | null>(this.readStoredUser());
  private readonly profileState = signal<UserProfileDto | null>(this.readSessionProfile());

  readonly token = this.tokenState.asReadonly();
  readonly currentUser = this.userState.asReadonly();
  readonly userProfile = this.profileState.asReadonly();
  readonly isLoggedIn = computed(() => Boolean(this.tokenState()));

  constructor() {
    // If token exists on app boot, refresh profile in background
    if (this.isLoggedIn()) {
      this.fetchProfile().subscribe({ error: () => {} });
    }
  }

  signup(request: SignupRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.authUrl}/signup`, request).pipe(
      tap((res) => {
        if (res.success && res.data) {
          this.setSession(res.data);
          this.fetchProfile().subscribe();
        }
      })
    );
  }

  login(request: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.authUrl}/login`, request).pipe(
      tap((res) => {
        if (res.success && res.data) {
          this.setSession(res.data);
          this.fetchProfile().subscribe();
        }
      })
    );
  }

  fetchCurrentUser(): Observable<ApiResponse<UserResponse>> {
    return this.http.get<ApiResponse<UserResponse>>(`${this.authUrl}/me`).pipe(
      tap((res) => {
        if (res.success && res.data) {
          this.userState.set(res.data);
          this.writeStoredUser(res.data);
        }
      })
    );
  }

  fetchProfile(force = false): Observable<ApiResponse<UserProfileDto>> {
    if (!this.isLoggedIn()) {
      return of({ success: false, message: 'Not logged in', data: null as any, timestamp: '' });
    }

    return this.http.get<ApiResponse<UserProfileDto>>(`${this.userUrl}/profile`).pipe(
      tap((res) => {
        if (res.success && res.data) {
          this.profileState.set(res.data);
          this.writeSessionProfile(res.data);
          // Also update base user
          const updatedUser: UserResponse = {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            contact: res.data.contact,
            role: res.data.role,
            createdAt: res.data.createdAt
          };
          this.userState.set(updatedUser);
          this.writeStoredUser(updatedUser);
        }
      })
    );
  }

  updateProfile(request: UpdateProfileRequest): Observable<ApiResponse<UserProfileDto>> {
    return this.http.put<ApiResponse<UserProfileDto>>(`${this.userUrl}/profile`, request).pipe(
      tap((res) => {
        if (res.success && res.data) {
          this.profileState.set(res.data);
          this.writeSessionProfile(res.data);
          const updatedUser: UserResponse = {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            contact: res.data.contact,
            role: res.data.role,
            createdAt: res.data.createdAt
          };
          this.userState.set(updatedUser);
          this.writeStoredUser(updatedUser);
        }
      })
    );
  }

  getAddresses(): Observable<ApiResponse<AddressDto[]>> {
    return this.http.get<ApiResponse<AddressDto[]>>(`${this.userUrl}/addresses`);
  }

  addAddress(request: CreateAddressRequest): Observable<ApiResponse<AddressDto>> {
    return this.http.post<ApiResponse<AddressDto>>(`${this.userUrl}/addresses`, request).pipe(
      tap(() => this.fetchProfile().subscribe())
    );
  }

  deleteAddress(addressId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.userUrl}/addresses/${addressId}`).pipe(
      tap(() => this.fetchProfile().subscribe())
    );
  }

  getEnquiries(): Observable<ApiResponse<EnquiryDto[]>> {
    return this.http.get<ApiResponse<EnquiryDto[]>>(`${this.userUrl}/enquiries`);
  }

  createEnquiry(request: CreateEnquiryRequest): Observable<ApiResponse<EnquiryDto>> {
    return this.http.post<ApiResponse<EnquiryDto>>(`${this.userUrl}/enquiries`, request).pipe(
      tap(() => this.fetchProfile().subscribe())
    );
  }

  logout(): void {
    this.tokenState.set(null);
    this.userState.set(null);
    this.profileState.set(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(PROFILE_SESSION_KEY);
    }
  }

  private setSession(authData: AuthResponse): void {
    this.tokenState.set(authData.token);
    this.userState.set(authData.user);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, authData.token);
      localStorage.setItem(USER_KEY, JSON.stringify(authData.user));
    }
  }

  private readStoredToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  private readStoredUser(): UserResponse | null {
    if (typeof localStorage === 'undefined') return null;
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  private writeStoredUser(user: UserResponse): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private readSessionProfile(): UserProfileDto | null {
    if (typeof sessionStorage === 'undefined') return null;
    try {
      const sessionRaw = sessionStorage.getItem(PROFILE_SESSION_KEY);
      if (sessionRaw) return JSON.parse(sessionRaw);
      // Fallback to local storage if present
      const localRaw = localStorage.getItem(PROFILE_SESSION_KEY);
      return localRaw ? JSON.parse(localRaw) : null;
    } catch {
      return null;
    }
  }

  private writeSessionProfile(profile: UserProfileDto): void {
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(PROFILE_SESSION_KEY, JSON.stringify(profile));
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(PROFILE_SESSION_KEY, JSON.stringify(profile));
      }
    } catch {}
  }
}
