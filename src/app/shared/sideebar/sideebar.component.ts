import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sideebar',
  templateUrl: './sideebar.component.html',
  styleUrls: ['./sideebar.component.css']
})
export class SideebarComponent implements OnInit {

  emailUsuario
  uid

  sidebarestadistica: boolean = false;

  user = []
  usuarioactivo

  constructor(public _AuthService: AuthService,
    public _Router: Router) { }

  ngOnInit() {

    this.obtenerUsuarios();
  }

  obtenerUsuarios() {

    this._AuthService.obtenerUser().subscribe(user => {
      this.user = user
      console.log("usuarios", this.user);

      this.identificarId()
    })
  }

  identificarId() {

    this._AuthService.getAuth().subscribe(auth => {

      if (auth) {

        this.emailUsuario = auth.email;

        for (let iterator of this.user) {
          if (iterator.email === this.emailUsuario) {
            // console.log(iterator.id)
            this.uid = iterator.id
            this.usuarioactivo = iterator
          }
        }
        console.log(this.usuarioactivo);

        if (this.usuarioactivo.tipo != 'usuario') {
          this.sidebarestadistica = true
        } else if (this.usuarioactivo.tipo != 'empresa'){
          this.sidebarestadistica = true
      // fin del if
      }
      this._AuthService.obtenerId(this.uid)
      //console.log("sss",this.idusuario);
    }
    })
  } //fin de identificarId


  salir() {
    this._AuthService.logout();
    this._Router.navigate(['/login'])
  }

}
