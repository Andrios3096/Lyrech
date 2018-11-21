import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public _AuthService:AuthService,
    public _Router:Router ) { }

  ngOnInit() {

    this._AuthService.obtenerUser().subscribe(data =>{
      console.log('data',data)
      
    })
  }

  ingresar(f: NgForm){
    console.log(f.value);
    console.log(f.valid);

    this._AuthService.loginEmail(f.value.email, f.value.password)
    .then ((res) => {
      this._Router.navigate(['/panel'])
    }). catch ((err) => { 
      console.log(err)
      this._Router.navigate(['/login'])
  })

  }



}
