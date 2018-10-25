import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean;
  nombreUsuario;
  emailUsuario;
  uid;

  constructor(public _AuthService:AuthService,
    public _Router:Router) { }

  ngOnInit() {
    this._AuthService.getAuth().subscribe(auth =>{
      if(auth){
        this.isLogin = true;

        this.emailUsuario = auth.email;

        this.uid= auth.uid;
        // console.log(this.nombreUsuario,this.emailUsuario,this.uid)
      } else {
        this.isLogin=false
      }
      
    })
  }

  salir(){
    this._AuthService.logout();
    this._Router.navigate(['/login'])
  }

}
