import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-sideebar',
  templateUrl: './sideebar.component.html',
  styleUrls: ['./sideebar.component.css']
})
export class SideebarComponent implements OnInit {

  emailUsuario
  uid

  constructor(public _AuthService:AuthService,
    public _Router:Router) { }

  ngOnInit() {

    this._AuthService.getAuth().subscribe(auth =>{

        this.emailUsuario = auth.email;

        this.uid= auth.uid;

    })
  }


  salir(){
    this._AuthService.logout();
    this._Router.navigate(['/login'])
  }

}
