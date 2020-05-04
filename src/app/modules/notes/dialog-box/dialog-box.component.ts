import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  whichComponent : string = "" ; 
  
  constructor() { }

  ngOnInit() {
    let a = localStorage.getItem("whichComponent") ;
    if (a == "notes") {
      this.whichComponent = "notes" ;
    }
    if (a == "teachers") {
      this.whichComponent = "teachers" ;
    }
    if (a == "students") {
      this.whichComponent = "students" ;
    }
  }

}
