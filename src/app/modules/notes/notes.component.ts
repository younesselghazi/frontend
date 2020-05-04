import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { Note } from 'src/app/model/Note';
import { HttpClientService } from 'src/app/services/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/model/Student';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  i : number ;
  note: Note = new Note();
  notes: Array<Note>;
  notes1: Array<Note>;
  student: Student = new Student();
  students: Array<Student>;
  students1: Array<Student>; 
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'studentFullName','subject', 'value', 'classe', 'semestre', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;
  searchKey2: string;
  searchKey3: string ;


  constructor(private httpClientService: HttpClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.refreshData();
    localStorage.removeItem("id") ;
    localStorage.removeItem("photo") ;
  }

  refreshData() {
    this.httpClientService.getNotes().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    this.refreshData2();
  }
  refreshData2() {
    this.httpClientService.getStudents().subscribe(
      response => this.handleSuccessfulResponse2(response),
    );
  }

  handleSuccessfulResponse(response) {
    this.notes = new Array<Note>();
    this.notes1 = response;
    for (const note of this.notes1) {
      const note2 = new Note();
      note2.id = note.id;
      note2.subject = note.subject;
      note2.studentFullName = note.studentFullName;
      note2.studentFirstName = note.studentFirstName;
      note2.studentLastName = note.studentLastName;
      note2.value = note.value;
      note2.classe = note.classe;
      note2.semestre = note.semestre;
      this.notes.push(note2);
      this.listData = new MatTableDataSource(this.notes);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    }
    console.log(this.listData);
  }

  handleSuccessfulResponse2(response) {
    this.students1 = response;
  }

  doThisThing(element : Note) {
    // for (const student of this.students1) {
        // console.log(student);
        console.log(element);
        for (const student of this.students1) {
          console.log(student);
          if (student.firstName == element.studentFirstName
            && student.lastName == element.studentLastName
            && student.classe == element.classe)
            {
            localStorage.setItem("id", student.id.toString());
            localStorage.setItem("photo", student.retrievedImage);
            this.router.navigate(['main', 'students', 'student-details']);
            break;
          }
          else {
            console.log("toz");
          }
        }
        if ( localStorage.getItem("id") == null) { 
          console.log("taztoz") ;
          localStorage.setItem("whichComponent","notes") ;
          this.dialog.open(DialogBoxComponent) ;
        }
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  onSearchClear2() {
    this.searchKey2 = "";
    this.applyFilter2();
  }
  onSearchClear3() {
    this.searchKey3 = "";
    this.applyFilter3();
  }

  filterValues = {
    classe : "" ,
    studentFullName : "" ,
    subject : ""
  }
/*onChange(filterValues: Object) { this.dataSource.filter = JSON.stringify(filterValues); }

And the predicate can go like this :

this.dataSource.filterPredicate = (data, filter) => { const filterArray = JSON.parse(filter); return (!filterArray['last_name'] || data.last_name.indexOf(filterArray['last_name']) > -1) && (!filterArray['first_name'] || data.first_name.indexOf(filterArray['first_name']) > -1) ; };*/

  applyFilter() {
    var abc = this.filterValues.subject ;
    var xyz = this.filterValues.studentFullName ;
    this.listData.filter = this.filterValues.classe = this.searchKey.trim().toLowerCase();
    this.listData.filterPredicate = function(data : Note, filter: string): boolean {
      return data.classe.toLowerCase().includes(filter) &&
      data.subject.toLowerCase().includes(abc) &&
      data.studentFullName.toLowerCase().includes(xyz) ;
  };
  }
  
  applyFilter2() {
    var abc = this.filterValues.classe ;
    var xyz = this.filterValues.studentFullName ;
    console.log(xyz);
    this.listData.filter = this.filterValues.subject = this.searchKey2.trim().toLowerCase();
    this.listData.filterPredicate = (data : Note, filter: string) => {
      return data.subject.toLowerCase().includes(filter) &&
      data.classe.toLowerCase().includes(abc) &&
      data.studentFullName.toLowerCase().includes(xyz) ;
  };
  }

  applyFilter3() {
    var abc = this.filterValues.classe ;
    var xyz = this.filterValues.subject ;
    this.listData.filter = this.filterValues.studentFullName = this.searchKey3.trim().toLowerCase();
    this.listData.filterPredicate = function(data : Note, filter: string): boolean {
      return data.studentFullName.toLowerCase().includes(filter) &&
      data.classe.toLowerCase().includes(abc) &&
      data.subject.toLowerCase().includes(xyz) ;
  };
  }

  viewNote(note: Note) {
    localStorage.setItem("id", note.id.toString());
    this.router.navigate(['main', 'notes', 'note-details']);
  }


  editNote(note: Note) {
    localStorage.setItem("id", note.id.toString());
    this.router.navigate(['main', 'notes', 'edit-notes']);
  }

  deleteNote(note: Note) {
    localStorage.setItem("id", note.id.toString());
    console.log(note.id);
    this.httpClientService.deleteNote(note.id).subscribe(
      (note) => {
        localStorage.setItem("whichComponent","notes") ;
        this.refreshData();
        this.dialog.open(DialogBoxComponent) ;
      }
    );

  }

}