import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatDialogModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatGridListModule

} from '@angular/material';
import { DefaultModule } from './layouts/default/default.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { Ng2Webstorage } from 'ngx-webstorage';
import { HttpClientInterceptor } from './login/http-client-interceptor';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Webstorage.forRoot()
  ],
  exports : [
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [ LoginService, {provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
