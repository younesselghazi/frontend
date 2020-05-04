import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Student } from 'src/app/model/Student';
import { HttpClientService } from 'src/app/services/httpclient.service';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  student: Student = new Student();
  students: Array<Student>;
  students1: Array<Student>;
  masculin: number = 0;
  feminin: number = 0;

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.httpClientService.getStudents().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response) {
    this.students1 = response;
    console.log(response);
    for (const student of this.students1) {
      if (student.gender.toLowerCase() == "m") { this.masculin++ }
      if (student.gender.toLowerCase() == "f") { this.feminin++ }
    }
    console.log(this.masculin);
    this.pieChartData = [this.feminin,this.masculin] ;
    console.log(this.feminin);
  }

  public pieChartLabels = ['Feminin','Masculin'];
  public pieChartData = [47,80];
  public pieChartType = 'pie';


  // student : Student ;
  // chartOptions: { };
  // Highcharts = Highcharts ;
  // constructor() { }

  // ngOnInit() {
  //   this.chartOptions = 
  //     {
  //       chart: {
  //           type: 'pie',
  //           options3d: {
  //               enabled: true,
  //               alpha: 45,
  //               beta: 0
  //           }
  //       },
  //       title: {
  //           text: null
  //       },
  //       accessibility: {
  //           point: {
  //               valueSuffix: '%'
  //           }
  //       },
  //       tooltip: {
  //           pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  //       },
  //       credits: {
  //         enabled: false,
  //       },
  //       exporting: {
  //         enabled: true,
  //       },
  //       plotOptions: {
  //           pie: {
  //               allowPointSelect: true,
  //               cursor: 'pointer',
  //               depth: 35,
  //               dataLabels: {
  //                   enabled: true,
  //                   format: '{point.name}'
  //               }
  //           }
  //       },
  //       series: [{
  //           type: 'pie',
  //           name: 'Students',
  //           data: [
  //               ['Male', 45.0],
  //               ['Female', 26.8]
  //           ]
  //       }]
  //   };
  // }

}
