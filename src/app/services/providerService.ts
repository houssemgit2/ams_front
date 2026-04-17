import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Provider } from '../../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private apiUrl = `${environment.urlApi}/providers/`;

  constructor(private http: HttpClient) {}

  getProviders(): Observable<Provider[]> {
    console.log('=>', this.apiUrl);

    return this.http.get<Provider[]>(this.apiUrl);
  }

  saveProvider(provider: Provider): Observable<Provider> {
    return this.http.post<Provider>(this.apiUrl, provider);
  }

  deleteProvider(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProviderById(id: number): Observable<Provider> {
    return this.http.get<Provider>(`${this.apiUrl}/${id}`);
  }

  updateProvider(provider: Provider): Observable<Provider> {
    return this.http.put<Provider>(`${this.apiUrl}/${provider.id}`, provider);
  }
}
