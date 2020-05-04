import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { StudentsComponent } from './modules/students/students.component';
import { TeachersComponent } from './modules/teachers/teachers.component';
import { LoginComponent } from './login/login.component';
import { AddStudentComponent } from './modules/students/add-student/add-student.component';
import { StudentDetailsComponent } from './modules/students/student-details/student-details.component';
import { AuthGuard } from './auth.guard';
import { EditStudentComponent } from './modules/students/edit-student/edit-student.component';
import { TeacherDetailsComponent } from './modules/teachers/teacher-details/teacher-details.component';
import { AddTeacherComponent } from './modules/teachers/add-teacher/add-teacher.component';
import { NotesComponent } from './modules/notes/notes.component';
import { EditTeacherComponent } from './modules/teachers/edit-teacher/edit-teacher.component';
import { AddNotesComponent } from './modules/notes/add-notes/add-notes.component';
import { EditNotesComponent } from './modules/notes/edit-notes/edit-notes.component';


const routes: Routes = [
  {
    path: 'main',
    component: DefaultComponent,
    canActivate: [AuthGuard] ,
    children: [
      {
        path: '',
        component: DashboardComponent, canActivate: [AuthGuard] , data: { animation: 'isLeft' }
      },
      {
        path: 'posts',
        component: PostsComponent, canActivate: [AuthGuard] , data: { animation: 'isRight' }
      },
      {
        path: 'students',
        component: StudentsComponent, canActivate: [AuthGuard] , data: { animation: 'isLeft' }
      },
      {
        path: 'students/add-student',
        component: AddStudentComponent, canActivate: [AuthGuard] , data: { animation: 'isRight' }
      },
      {
        path: 'students/student-details',
        component: StudentDetailsComponent, canActivate: [AuthGuard] , data: { animation: 'isRight' }
      },
      {
        path: 'students/edit-student',
        component: EditStudentComponent, canActivate: [AuthGuard] , data: { animation: 'isRight' }
      },
      {
        path: 'notes',
        component: NotesComponent, canActivate: [AuthGuard] , data: { animation: 'isLeft' }
      },
      {
        path: 'notes/add-notes',
        component: AddNotesComponent, canActivate: [AuthGuard] , data: { animation: 'isRight' }
      },
      {
        path: 'notes/edit-notes',
        component: EditNotesComponent, canActivate: [AuthGuard] , data: { animation: 'isRight' }
      },
      {
        path: 'teachers',
        component: TeachersComponent, canActivate: [AuthGuard] , data: { animation: 'isRight' }
      },
      {
        path: 'teachers/teacher-details',
        component: TeacherDetailsComponent, canActivate: [AuthGuard] , data: { animation: 'isLeft' }
      },
      {
        path: 'teachers/add-teacher',
        component: AddTeacherComponent, canActivate: [AuthGuard] , data: { animation: 'isRight' }
      },
      {
        path: 'teachers/edit-teacher',
        component: EditTeacherComponent, canActivate: [AuthGuard] , data: { animation: 'isLeft' }
      }
      ]

  },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
