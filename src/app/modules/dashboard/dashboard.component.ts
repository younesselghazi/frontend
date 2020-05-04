import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/httpclient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private httpClientService : HttpClientService) { }
  public nOS = "" ;
  public nOT = "" ;

  ngOnInit() {
    this.getNOS() ;
    this.getNOT() ;
  }

  getNOS() {
    this.httpClientService.getNOS().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }
  getNOT() {
    this.httpClientService.getNOT().subscribe(
      response => this.handleSuccessfulResponse2(response),
    );
  }
  handleSuccessfulResponse2(response) {
    this.nOT = response ;
  }
  handleSuccessfulResponse(response) {
    this.nOS = response ;
  }
}
