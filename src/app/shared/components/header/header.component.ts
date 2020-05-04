import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter()
  

  constructor( private loginService : LoginService) { }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }



}
