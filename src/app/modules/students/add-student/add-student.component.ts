import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'src/app/model/Student';
import { HttpClientService } from 'src/app/services/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  student: Student = new Student();
  
  private selectedFile;
  imgURL: any;
  constructor(private httpClientService: HttpClientService, private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
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
  addStudent() {
    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;
    this.httpClient.post('http://localhost:8080/api/students/upload', uploadData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.httpClientService.addStudent(this.student).subscribe(
            (student) => {
              this.router.navigate(['main', 'students']);
            } 
          );
          console.log('Image uploaded successfully');
        } else {
          console.log('Image not uploaded successfully');
        }
      });
}
}