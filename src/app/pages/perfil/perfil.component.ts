import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  forma:FormGroup;

  usuario: any = {
    nombre: '',
    telefono: '',
    imagen: ''
  }

  constructor(public _AuthService:AuthService) { }

  ngOnInit() {

    this.forma = new FormGroup({

      nombre: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      imagen: new FormControl(null, Validators.required),

      })


  }



}
