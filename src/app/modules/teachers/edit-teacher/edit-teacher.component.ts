import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/model/Teacher';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/httpclient.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss']
})
export class EditTeacherComponent implements OnInit {

  teacher : Teacher = new Teacher() ;
  imgURL: any;
  private selectedFile;

  constructor(private router : Router , private httpClientService : HttpClientService) { }

  ngOnInit() {
    this.editTeacher() ;
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

  editTeacher() {
    let id = localStorage.getItem("id") ;
    this.httpClientService.getTeacher(+id).subscribe(
      data => {
        console.log(data);
        this.teacher = data ;
      }
    )
  }

  actualizar(teacher : Teacher) {
    this.httpClientService.updateTeacher(teacher).subscribe(
      data => {
        this.teacher = data ;
        alert("les informations sont modifiées avec succès") ;
        this.router.navigate(['main','teachers']) ;
      }
    )
  }
}
