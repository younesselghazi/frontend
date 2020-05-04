import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/app/model/Student';
import { HttpClientService } from 'src/app/services/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material'
import { DialogBoxComponent } from '../notes/dialog-box/dialog-box.component';
import { MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  student: Student = new Student();
  students: Array<Student>;
  students1: Array<Student>;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['firstName','lastName', 'email', 'gender', 'classe' , 'actions'];
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
  }
  refreshData() {
    this.httpClientService.getStudents().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    /*this.activatedRoute.queryParams.subscribe(
      (params) => {
        const selectedStudentId = params['id'];
        this.action = params['action'];
        if (selectedStudentId) {
          this.selectedStudent = this.students.find(student => student.id === + selectedStudentId);
        }
      }
    );*/
  }
  handleSuccessfulResponse(response) {
    this.students = new Array<Student>();
    this.students1 = response;
    for (const student of this.students1) {

      const student2 = new Student();
      student2.id = student.id;
      student2.firstName = student.firstName;
      student2.email = student.email;
      student2.classe = student.classe;
      student2.filiere = student.filiere;
      student2.gender = student.gender;
      student2.retrievedImage = 'data:image/jpeg;base64,' + student.picByte;
      student2.lastName = student.lastName;
      student2.picByte = student.picByte;
      this.students.push(student2);
      this.listData = new MatTableDataSource(this.students);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

    }
      console.log(this.listData);

    

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
    lastName : "" ,
    firstName : ""
  }
/*onChange(filterValues: Object) { this.dataSource.filter = JSON.stringify(filterValues); }

And the predicate can go like this :

this.dataSource.filterPredicate = (data, filter) => { const filterArray = JSON.parse(filter); return (!filterArray['last_name'] || data.last_name.indexOf(filterArray['last_name']) > -1) && (!filterArray['first_name'] || data.first_name.indexOf(filterArray['first_name']) > -1) ; };*/

applyFilter() {
  var abc = this.filterValues.firstName ;
  var xyz = this.filterValues.lastName ;
  this.listData.filter = this.filterValues.classe = this.searchKey.trim().toLowerCase();
  this.listData.filterPredicate = function(data : Student, filter: string): boolean {
    return data.classe.toLowerCase().includes(filter) &&
    data.firstName.toLowerCase().includes(abc) &&
    data.lastName.toLowerCase().includes(xyz) ;
};
}

applyFilter2() {
  var abc = this.filterValues.classe ;
  var xyz = this.filterValues.lastName ;
  console.log(xyz);
  this.listData.filter = this.filterValues.firstName = this.searchKey2.trim().toLowerCase();
  this.listData.filterPredicate = (data : Student, filter: string) => {
    return data.firstName.toLowerCase().includes(filter) &&
    data.classe.toLowerCase().includes(abc) &&
    data.lastName.toLowerCase().includes(xyz) ;
};
}

applyFilter3() {
  var abc = this.filterValues.classe ;
  var xyz = this.filterValues.firstName ;
  this.listData.filter = this.filterValues.lastName = this.searchKey3.trim().toLowerCase();
  this.listData.filterPredicate = function(data : Student, filter: string): boolean {
    return data.lastName.toLowerCase().includes(filter) &&
    data.classe.toLowerCase().includes(abc) &&
    data.firstName.toLowerCase().includes(xyz) ;
};
}


  // viewStudent(id: number) {
  //   this.router.navigate(['main', 'students'], { queryParams: { id, action: 'view' } });
  //   this.openDialog() ;
  // }
  viewStudent(student: Student) {
    localStorage.setItem("id", student.id.toString());
    localStorage.setItem("photo", student.retrievedImage);
    this.router.navigate(['main', 'students', 'student-details']);
  }

  editStudent(student: Student) {
    localStorage.setItem("id", student.id.toString());
    this.router.navigate(['main', 'students', 'edit-student']);
  }

  deleteStudent(student: Student) {
    localStorage.setItem("id", student.id.toString());
    console.log(student.id);
    this.httpClientService.deleteStudent(student.id).subscribe(
      (student) => {
        localStorage.setItem("whichComponent","students") ;
        this.refreshData();
        this.dialog.open(DialogBoxComponent) ;
      }
    );

  }
  // openDialog() {
  //   this.dialog.open(StudentDetailsComponent);
  // }


}
