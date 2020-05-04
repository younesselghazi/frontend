import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/model/Note';
import { HttpClientService } from 'src/app/services/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.scss']
})
export class EditNotesComponent implements OnInit {
  note: Note = new Note();
  private selectedFile;
  imgURL: any;

  constructor(private httpClientService: HttpClientService, private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
    this.editNote();
  }

  editNote() {

    let id = localStorage.getItem("id");
    this.httpClientService.getNote(+id).subscribe(
      data => {
        console.log(data);
        this.note = data;
      }
    )
  }

  actualizar(note: Note) {
  this.note.teacherFullName = this.note.teacherLastName + " " + this.note.teacherFirstName ;
  this.note.studentFullName = this.note.studentLastName + " " + this.note.studentFirstName ;
    this.httpClientService.updateNote(note).subscribe(
      data => {
        this.note = data;
        alert("les informations sont modifiées avec succès");
        this.router.navigate(['main', 'notes']);
      }
    )
  }
}
