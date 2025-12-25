import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardData } from '../../models/models';
import { URLS } from '../consts/urls';
import { LoginRequest, LoginResponse } from '../../models/api-models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly #http = inject(HttpClient);

  public login(payload: LoginRequest) {
    return this.#http.post<LoginResponse>(`${URLS.baseUrl}${URLS.user.login}`, payload);
  }

  checkToken(){}

  public getDashboardData(): Observable<DashboardData> {
    return this.#http.get<DashboardData>(URLS.mockData);
  }


}

// {
// "userName": "Warner",
// "password": "ea",
// "fullName": "Ines Lowe",
// "initials": "IL",
// "token": "58ebfdf7f1f558c5c86e17f6"
// },
