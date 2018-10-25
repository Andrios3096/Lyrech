import { Component, OnInit } from '@angular/core';


declare function init_plugins();
declare function init_plugins2();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit() {

    init_plugins();
    init_plugins2();
  }

}
