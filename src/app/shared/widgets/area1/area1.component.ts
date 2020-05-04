import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Teacher } from 'src/app/model/Teacher';
import { HttpClientService } from 'src/app/services/httpclient.service';

@Component({
  selector: 'app-widget-area1',
  templateUrl: './area1.component.html',
  styleUrls: ['./area1.component.scss']
})
export class Area1Component implements OnInit {
  teacher: Teacher = new Teacher();
  teachers: Array<Teacher>;
  teachers1: Array<Teacher>;
  masculin: number = 0;
  feminin: number = 0;

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.httpClientService.getTeachers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response) {
    this.teachers1 = response;
    console.log(response);
    for (const teacher of this.teachers1) {
      if (teacher.gender.toLowerCase() == "m") { this.masculin++ }
      if (teacher.gender.toLowerCase() == "f") { this.feminin++ }
    }
    console.log(this.masculin);
    this.pieChartData = [this.feminin,this.masculin] ;
    console.log(this.feminin);
  }

  public pieChartLabels = ['Feminin','Masculin'];
  public pieChartData = [47,80];
  public pieChartType = 'pie';

}
