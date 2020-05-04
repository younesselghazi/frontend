import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/model/Note';
import { HttpClientService } from 'src/app/services/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
  note: Note = new Note();
  private selectedFile;
  imgURL: any;

  constructor(private httpClientService: HttpClientService, private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  
  addNote() {
    
  this.note.teacherFullName = this.note.teacherLastName + " " + this.note.teacherFirstName ;
  this.note.studentFullName = this.note.studentLastName + " " + this.note.studentFirstName ;
          this.httpClientService.addNote(this.note).subscribe(
            (note) => {
              this.router.navigate(['main', 'notes']);
            } 
          );
          }
        }