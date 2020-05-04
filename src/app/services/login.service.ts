import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginPayload} from 'src/app/login/login-payload';
import {JwtAutResponse} from 'src/app/login/jwt-aut-response';
import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private url = 'http://localhost:8080/api/auth/';

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService,
    private router : Router ) {
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<JwtAutResponse>(this.url + 'login', loginPayload).pipe(map(data => {
      this.localStorageService.store('authenticationToken', data.authenticationToken);
      this.localStorageService.store('username', data.username);
      return true; 
    })); 
  }

  isAuthenticated(): boolean {
    return this.localStorageService.retrieve('username') != null;
  }

  logout() {
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
    this.router.navigateByUrl('/login');
  }
  /*token: string;
  constructor( private http: HttpClient) { }
  sendCredential(model) {
    let tokenUrl1 = "http://localhost:8080/users/login";
    let headers1 = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(tokenUrl1, JSON.stringify(model), {headers: headers1});
  }
  sendToken(token) {
    let tokenUrl2 = "http://localhost:8080/rest/user/users";
    console.log('Bearer '+ token);
    let getHeaders = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.get(tokenUrl2, {headers: getHeaders})
  }
  logout() {
    localStorage.setItem("token","");
    localStorage.setItem("currentUserName", '');
    alert("You just logged out.");
  }
  checkLogin() {
    if (localStorage.getItem("currentUserName")!=null && localStorage.getItem("currentUserName")!='' && localStorage.getItem("token")!=null && localStorage.getItem("token")!='') {
      return true;
    } else {
      return false;
    }
  }*/
} 