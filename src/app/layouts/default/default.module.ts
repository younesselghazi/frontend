import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatCard, MatCardModule, MatGridListModule, MatIconModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTableDataSource } from '@angular/material';
import { StudentsComponent } from 'src/app/modules/students/students.component';
import { TeachersComponent } from 'src/app/modules/teachers/teachers.component';
import { HttpClientModule } from '@angular/common/http';
import { AddStudentComponent } from 'src/app/modules/students/add-student/add-student.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { StudentDetailsComponent } from 'src/app/modules/students/student-details/student-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditStudentComponent } from 'src/app/modules/students/edit-student/edit-student.component';
import { TeacherDetailsComponent } from 'src/app/modules/teachers/teacher-details/teacher-details.component';
import { AddTeacherComponent } from 'src/app/modules/teachers/add-teacher/add-teacher.component';
import { EditTeacherComponent } from 'src/app/modules/teachers/edit-teacher/edit-teacher.component';
import { NotesComponent } from 'src/app/modules/notes/notes.component';
import { DialogBoxComponent } from 'src/app/modules/notes/dialog-box/dialog-box.component';
import { AddNotesComponent } from 'src/app/modules/notes/add-notes/add-notes.component';
import { EditNotesComponent } from 'src/app/modules/notes/edit-notes/edit-notes.component';





@NgModule({
  declarations: [
    DefaultComponent, 
    DashboardComponent,
    PostsComponent,
    StudentsComponent,AddStudentComponent,StudentDetailsComponent,EditStudentComponent,
    TeachersComponent,TeacherDetailsComponent,AddTeacherComponent,EditTeacherComponent,
    NotesComponent,DialogBoxComponent,AddNotesComponent,EditNotesComponent
  ],
  entryComponents: [DialogBoxComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,MatPaginatorModule,MatSortModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,MatInputModule,MatDatepickerModule,MatNativeDateModule
  ],
  exports : [
    MatTableModule,MatPaginatorModule,MatSortModule,ReactiveFormsModule,FormsModule,MatFormFieldModule,MatInputModule,MatDialogModule,MatDatepickerModule,MatNativeDateModule
  ]
})
export class DefaultModule { }
