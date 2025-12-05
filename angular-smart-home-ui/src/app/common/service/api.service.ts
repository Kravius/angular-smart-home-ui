import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardData } from '../../models/models';
import { URLS } from '../consts/urls';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly #http = inject(HttpClient);

  public getDashboardData(): Observable<DashboardData> {
    return this.#http.get<DashboardData>(URLS.mockData);
  }
}
