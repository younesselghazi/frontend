import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginPayload } from 'src/app/login/login-payload';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 
   
  loginForm: FormGroup; 
  loginPayload: LoginPayload; 
  isLogged = false ;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    this.loginPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit() {
    this.checkLogin() ;
  }

  checkLogin() {
    var username = localStorage.getItem('ng2-webstorage|username') ;
    if ( username != null ) {
      console.log("not null") ;
      this.isLogged = true ;
    } else {
      console.log("null");
    }
  }

  goBackToMain() {
    this.router.navigate(['main']) ;
  }
  onSubmit() {
    this.loginPayload.username = this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value;

    this.loginService.login(this.loginPayload).subscribe(data => {
      if (data) {
        console.log('login success');
        this.router.navigateByUrl('/main');
      } else {
        alert('mot de passe incorrect');
        console.log('Login failed');
      }
    });
  } 
}
