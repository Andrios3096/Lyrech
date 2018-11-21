import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nueva-inversion',
  templateUrl: './nueva-inversion.component.html',
  styleUrls: ['./nueva-inversion.component.css']
})
export class NuevaInversionComponent implements OnInit {

  forma:FormGroup;

  inversion = {
    monto: '',
    plazo: '',
    cuotas :'',
    taza :'',
    pagare:'',
    visita:'',
    aval:''
  }

  constructor(public _AuthService:AuthService) { }

  ngOnInit() {

    this.forma = new FormGroup({

      monto: new FormControl(null, Validators.required),
      plazo: new FormControl(null, Validators.required),
      cuotas: new FormControl(null, Validators.required),
      taza: new FormControl(null, Validators.required),
      pagare: new FormControl(null, Validators.required),
      visita: new FormControl(null, Validators.required),
      aval: new FormControl(null, Validators.required)
    })
  
  }

  agregarInversion() {

      this.inversion.monto = this.forma.value.monto,
      this.inversion.plazo = this.forma.value.plazo,
      this.inversion.cuotas = this.forma.value.cuotas,
      this.inversion.taza = this.forma.value.taza,
      this.inversion.pagare = this.forma.value.pagare,
      this.inversion.visita = this.forma.value.visita,
      this.inversion.aval = this.forma.value.aval,

      this._AuthService.agregarInversion(this.inversion)

  }
}
