import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private htpp: HttpClient) {}

  getProviders() {
    return this.htpp.get('http://localhost:8080/providers/');
  }
}
