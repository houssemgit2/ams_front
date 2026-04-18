import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Authentication {
  constructor(private httpClient: HttpClient) {}

  authenticate(username: string, password: string) {
    return this.httpClient
      .post<any>(`${environment.authUrl}signin`, {
        username,
        password,
      })
      .pipe(
        map((data) => {
          sessionStorage.setItem('token', data.accessToken);
          sessionStorage.setItem('email', data.email);
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('roles', JSON.stringify(data.roles));

          return data;
        }),
      );
  }

  /*
  constructor() { }

  authenticate(username:any, password:any) {
    if (username === "amine" && password === "1234") {
      sessionStorage.setItem('username', username)
      return true;
    } else {
      return false;
    }
  }
*/
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    //console.log(!(user === null))
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    /*
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('roles');*/
  }
}
