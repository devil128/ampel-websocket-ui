import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showFiller = false;
  isScreenSmall: boolean = false;

  ngOnInit() {
    window.onresize = () => this.isScreenSmall = window.innerWidth <= 600;
  }

}
