import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/model/Teacher';
import { HttpClientService } from 'src/app/services/httpclient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {

  public teacher: Teacher = new Teacher();

  constructor(private httpClientService: HttpClientService, private router: Router) { }

  ngOnInit() {
    this.viewTeacher();
  }

  viewTeacher() {
    let id = localStorage.getItem("id");
    this.httpClientService.getTeacher(+id).subscribe(
      data => {
        this.teacher = data;
        this.teacher.retrievedImage = localStorage.getItem("photo");
      }
    )

  }
  deleteTeacher() {
    this.httpClientService.deleteTeacher(this.teacher.id).subscribe(
      (teacher) => {
        this.router.navigate(['main', 'teachers']);
      }
    );
  }
}


