import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardTabsData, DashboardListItem, Item, DeviceItem } from '../../models/models';
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

  public getAllDevices() {
    return this.#http.get<Item[]>(`${URLS.baseUrl}${URLS.devices}`);
  }

  public updateDevices(devicesId: string, newState: boolean): Observable<DeviceItem> {
    return this.#http.patch<DeviceItem>(`${URLS.baseUrl}${URLS.devices}/${devicesId}`, {
      state: newState,
    });
  }

  public getDashboardListItem(): Observable<DashboardListItem[]> {
    return this.#http.get<DashboardListItem[]>(`${URLS.baseUrl}${URLS.dashboards}`);
  }

  public getDashboardTabsData(dashboardId: string): Observable<DashboardTabsData> {
    return this.#http.get<DashboardTabsData>(`${URLS.baseUrl}${URLS.dashboards}/${dashboardId}`);
  }

  public postDashboardItem({ id, title, icon }: DashboardListItem) {
    return this.#http.post<DashboardListItem>(`${URLS.baseUrl}${URLS.dashboards}`, {
      id,
      title,
      icon,
    });
  }

  public putDashboardTabsItem(dashboardId: string, dashboardTabsData: DashboardTabsData) {
    return this.#http.put<DashboardTabsData>(`${URLS.baseUrl}${URLS.dashboards}/${dashboardId}`, {
      ...dashboardTabsData,
    });
  }

  public deleteDashboardItem(id: string) {
    return this.#http.delete(`${URLS.baseUrl}${URLS.dashboards}/${id}`);
  }
}
