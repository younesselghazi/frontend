import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/httpclient.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user : User = new User() ;
  username : String ;
  email : String ;

  constructor(private httpClientService : HttpClientService) { }

  ngOnInit() {
    this.getInfo() ;
  }

  getInfo() {
    let i = localStorage.getItem('ng2-webstorage|username').length ;
    let username = localStorage.getItem('ng2-webstorage|username').slice(1,i-1) ;
    this.username = username ;
    this.httpClientService.getUser(username).subscribe(
      data => this.email = data.email ,
    ) ;
  }
}
