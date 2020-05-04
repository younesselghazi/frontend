import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { Teacher } from 'src/app/model/Teacher';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientService } from 'src/app/services/httpclient.service';
import { DialogBoxComponent } from '../notes/dialog-box/dialog-box.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  teacher : Teacher = new Teacher() ;
  teachers: Array<Teacher>;
  teachers1: Array<Teacher>;
  selectedTeacher: Teacher;
  listData : MatTableDataSource<any> ;
  displayedColumns : string[] = ['firstName','lastName','email','filiere','gender', 'actions'];
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
    this.httpClientService.getTeachers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }
  handleSuccessfulResponse(response) {
    this.teachers = new Array<Teacher>();
    this.teachers1 = response;
    for (const teacher of this.teachers1) {
      
      const teacher2 = new Teacher();
      teacher2.id = teacher.id;
      teacher2.firstName = teacher.firstName;
      teacher2.email = teacher.email;
      teacher2.filiere = teacher.filiere;
      teacher2.gender = teacher.gender;
      teacher2.retrievedImage = 'data:image/jpeg;base64,' + teacher.picByte;
      teacher2.lastName = teacher.lastName;
      teacher2.picByte = teacher.picByte;
      this.teachers.push(teacher2);
      this.listData = new MatTableDataSource(this.teachers);
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
    filiere : "" ,
    lastName : "" ,
    firstName : ""
  }
/*onChange(filterValues: Object) { this.dataSource.filter = JSON.stringify(filterValues); }

And the predicate can go like this :

this.dataSource.filterPredicate = (data, filter) => { const filterArray = JSON.parse(filter); return (!filterArray['last_name'] || data.last_name.indexOf(filterArray['last_name']) > -1) && (!filterArray['first_name'] || data.first_name.indexOf(filterArray['first_name']) > -1) ; };*/

applyFilter() {
  var abc = this.filterValues.firstName ;
  var xyz = this.filterValues.lastName ;
  this.listData.filter = this.filterValues.filiere = this.searchKey.trim().toLowerCase();
  this.listData.filterPredicate = function(data : Teacher, filter: string): boolean {
    return data.filiere.toLowerCase().includes(filter) &&
    data.firstName.toLowerCase().includes(abc) &&
    data.lastName.toLowerCase().includes(xyz) ;
};
}

applyFilter2() {
  var abc = this.filterValues.filiere ;
  var xyz = this.filterValues.lastName ;
  console.log(xyz);
  this.listData.filter = this.filterValues.firstName = this.searchKey2.trim().toLowerCase();
  this.listData.filterPredicate = (data : Teacher, filter: string) => {
    return data.firstName.toLowerCase().includes(filter) &&
    data.filiere.toLowerCase().includes(abc) &&
    data.lastName.toLowerCase().includes(xyz) ;
};
}

applyFilter3() {
  var abc = this.filterValues.filiere ;
  var xyz = this.filterValues.firstName ;
  this.listData.filter = this.filterValues.lastName = this.searchKey3.trim().toLowerCase();
  this.listData.filterPredicate = function(data : Teacher, filter: string): boolean {
    return data.lastName.toLowerCase().includes(filter) &&
    data.filiere.toLowerCase().includes(abc) &&
    data.firstName.toLowerCase().includes(xyz) ;
};
}

  viewTeacher(teacher : Teacher) {
    localStorage.setItem("id",teacher.id.toString()) ;
    localStorage.setItem("photo",teacher.retrievedImage) ;
    this.router.navigate(['main', 'teachers', 'teacher-details']);
  }

  editTeacher(teacher: Teacher) {
    localStorage.setItem("id", teacher.id.toString());
    this.router.navigate(['main', 'teachers', 'edit-teacher']);
  }

  deleteTeacher(teacher: Teacher) {
    localStorage.setItem("id", teacher.id.toString());
    console.log(teacher.id);
    this.httpClientService.deleteTeacher(teacher.id).subscribe(
      (teacher) => {
        localStorage.setItem("whichComponent","teachers") ;
        this.refreshData();
        this.dialog.open(DialogBoxComponent) ;
      }
    );

  }


}
  

  
