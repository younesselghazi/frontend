import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/httpclient.service';
import { Student } from 'src/app/model/Student';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  student : Student = new Student() ;
  private selectedFile;
  imgURL: any;
  constructor(private router : Router , private httpClientService : HttpClientService) { }

  ngOnInit() {
    this.editStudent() ;
  }
  
  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  editStudent() {
    let id = localStorage.getItem("id") ;
    this.httpClientService.getStudent(+id).subscribe(
      data => {
        console.log(data);
        this.student = data ;
      }
    )
  }

  actualizar(student : Student) {
    this.httpClientService.updateStudent(student).subscribe(
      data => {
        this.student = data ;
        alert("les informations sont modifiées avec succès") ;
        this.router.navigate(['main','students']) ;
      }
    )
  }
}
