import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';

import {Router} from '@angular/router';

import * as moment from 'moment';

import * as firebase from 'firebase/';

@Component({
  selector: 'app-nueva-inversion',
  templateUrl: './nueva-inversion.component.html',
  styleUrls: ['./nueva-inversion.component.css']
})
export class NuevaInversionComponent implements OnInit {

  forma:FormGroup;

  

  inversion: any = {
    seguro: {
      pagare: '',
      aval: '',
      visita: ''
    },
    usuarioUid: '',
    monto: '',
    plazo: '',
    cuotas :'',
    taza :'',
    fecharegistro: '',
    estado: '',
  }

  constructor(public _AuthService:AuthService,
              public _Router:Router) { }

  ngOnInit() {

    this.forma = new FormGroup({

      monto: new FormControl(null, Validators.required),
      plazo: new FormControl(null, Validators.required),
      cuotas: new FormControl(null, Validators.required),
      taza: new FormControl(null, Validators.required),

      seguro: new FormGroup({
        pagare: new FormControl(null, Validators.required),
        aval: new FormControl(null, Validators.required),
        visita: new FormControl(null, Validators.required),
      }), // fin del formgroup seguro
    }) // fin del formgroup forma
  
  } // fin del ngOnit

  agregarInversion() {

    this._AuthService.getAuth().subscribe(auth => {

      this.inversion.usuarioUid = auth.uid;
      this.inversion.monto = this.forma.value.monto,
      this.inversion.plazo = moment(this.forma.value.plazo).format("X"),
      this.inversion.cuotas = this.forma.value.cuotas,
      this.inversion.taza = this.forma.value.taza,
      this.inversion.seguro = this.forma.value.seguro,
      this.inversion.fecharegistro = firebase.firestore.FieldValue.serverTimestamp(),
      this.inversion.estado = 'proceso';

      this._AuthService.agregarInversion(this.inversion)
      this._Router.navigate(['/inicio'])

    }) //fin del getauth
  } // fin del agregarInversion
}
