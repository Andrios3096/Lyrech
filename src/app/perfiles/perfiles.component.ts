import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  emailUsuario;
  lol;

  usuarios=[];

  constructor(public _AuthService:AuthService) {

    console.log('asdasd');
    
  }

  ngOnInit() {

    this._AuthService.obtenerUser().subscribe(data =>{
      this.usuarios = data;
      console.log(data)

       this.identificarId()

      });

  }


  identificarId(){

    this._AuthService.getAuth().subscribe(auth =>{
  
      if(auth){
  
        this.emailUsuario = auth.email;
  
        for (let iterator of this.usuarios) {
          if (iterator.email === this.emailUsuario) {
            // console.log(iterator.id)
            this.lol = iterator.id
          }
        }
      }
      this._AuthService.obtenerId(this.lol)
      console.log("sss",this.lol);
      
    })
    }

}
