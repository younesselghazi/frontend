import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader , slider} from './route-animations' ;

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  animations: [
    //fader,
    slider
  ]
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;

  constructor() { }

  ngOnInit() {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen ;
  }
  
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
