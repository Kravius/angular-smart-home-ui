import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardTabsData, DashboardListItem } from '../../models/models';
import { URLS } from '@consts/urls';
import { LoginRequest, LoginResponse, UserProfile } from '../../models/api-models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly #http = inject(HttpClient);

  public login(payload: LoginRequest) {
    return this.#http.post<LoginResponse>(`${URLS.baseUrl}${URLS.user.login}`, payload);
  }

  public checkToken() {
    return this.#http.get<UserProfile>(`${URLS.baseUrl}${URLS.user.profile}`);
  }

  public getDashboardListItem(): Observable<DashboardListItem> {
    return this.#http.get<DashboardListItem>(`${URLS.baseUrl}${URLS.dashboards}`);
  }
  public getDashboardListItemQQQ(): Observable<DashboardListItem[]> {
    return this.#http.get<DashboardListItem[]>(`${URLS.baseUrl}${URLS.dashboards}`);
  }

  public getDashboardTabsData(dashboardId: string): Observable<DashboardTabsData> {
    return this.#http.get<DashboardTabsData>(`${URLS.baseUrl}${URLS.dashboards}/${dashboardId}`);
  }
}
