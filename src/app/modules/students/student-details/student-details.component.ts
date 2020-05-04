import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from 'src/app/model/Student';
import { HttpClientService } from 'src/app/services/httpclient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  // @Input()
  // public student: Student;

  public student: Student = new Student();
  // @Output()
  // studentDeletedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService, private router: Router) { }

  ngOnInit() {
    this.viewStudent();
  }

  viewStudent() {
    let id = localStorage.getItem("id");
    this.httpClientService.getStudent(+id).subscribe(
      data => {
        this.student = data;
        this.student.retrievedImage = localStorage.getItem("photo");
      }
    )

  }

  // editStudent() {
  //   this.router.navigate(['main', 'students' , 'edit-student'], { queryParams: { action: 'edit', id: this.student.id } });
  // }
  deleteStudent() {
    this.httpClientService.deleteStudent(this.student.id).subscribe(
      (student) => {
        this.router.navigate(['main', 'students']);
      }
    );
  }
}
