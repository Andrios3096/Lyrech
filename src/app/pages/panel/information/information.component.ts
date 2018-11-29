import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as firebase from 'firebase/app';
import { log } from 'util';





@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  forma: FormGroup;

  informacion;

  fecha;
  fechalimite
  fechaapi;

  fechamostrada
  fechaactual

  timerUpdate;

  dias: any;

  tazareal;

  cantidadmaxima;

  usuariossubscritos: any = {
    usuarioid: '',
    montoinvertido: '',
    fechainversion: '',
    idinversion:''
  }

  usuariossubs

  sumademontosinvertidos = 0

  dineroinvertido = []

  pozodeinversion


  constructor(public _ActivatedRoute: ActivatedRoute,
    public _AuthService: AuthService,
    public _Router: Router,
    public _http: HttpClient) {


    this.obtenerfechaapi()
    this.obtenerInformacion();

  } // fin del constructor

  ngOnInit() {
    
    this.forma = new FormGroup({
      cantidadinvertida: new FormControl(null, Validators.required),
    })

    this.temporizador()
  } // fin del ngOnit

  ngOnDestroy() {
    clearInterval(this.timerUpdate);
    this.fechaapi.unsubscribe();

  } // fin del ngondestroy

  obtenerInformacion() {

    this._ActivatedRoute.params.subscribe(params => {
      // console.log(params.id);
      this._AuthService.obtenerInformacion(params.id).subscribe(inversiones => {
        // console.log(inversiones);
        this.informacion = inversiones;

        this.verificarurl();

        this.fechalimite = this.informacion[0].plazo;
        this.tazareal = this.informacion[0].taza - 2;
        this.cantidadmaxima = this.informacion[0].monto;

        console.log("info", this.informacion[0].seguro);
        console.log("fecha limite", this.fechalimite);


        
      }) // fin del obtenerinformacion
      this.obtenerpersonassuscritas(params.id);

    }) // fin del params
  }

  obtenerpersonassuscritas(id){

    this._AuthService.obtenerusuariossubscritos().subscribe(usersubs => {
      this.usuariossubs = usersubs
      console.log(this.usuariossubs);

      this.sumademontosinvertidos=0

      for (const iterator of this.usuariossubs) {

        if (iterator.idinversion == id ) {
          this.sumademontosinvertidos = this.sumademontosinvertidos + iterator.montoinvertido
        }

      }
      console.log(this.sumademontosinvertidos);
    })
  }

  verificarurl() {
    if (this.informacion.length == 0) {

      this._Router.navigate(['/pagenotfound'])

    }
  }

  obtenerfechaapi() {

    this.fechaapi = this._http.get('http://api.timezonedb.com/v2.1/get-time-zone?key=H1KWE6XJEXVS&format=json&by=zone&zone=America/Lima')
      .subscribe((data: any) => {

        this.fecha = data.timestamp
        this.timer();

      });

  }

  /************************************************************************************************************** */

  timer() {

    this.fecha = this.fecha + 1;
    this.fechamostrada = []

    this.fechaactual = (this.fechalimite - this.fecha + 1000)
    let Seconds: any = ('0' + Math.floor(this.fechaactual % 60)).slice(-2)
    let Minutes: any = ('0' + Math.floor(this.fechaactual / 60 % 60)).slice(-2)
    let Hours: any = ('0' + Math.floor(this.fechaactual / 3600 % 24)).slice(-2)
    this.dias = Math.floor(this.fechaactual / (3600 * 24));

    console.log(`${this.dias}-${Hours}-${Minutes}-${Seconds}`);

    this.fechamostrada.push(`${this.dias} Dias - ${Hours} horas - ${Minutes} minutos - ${Seconds} segundos`)


  } // fin del timer

  temporizador() {

    this.timerUpdate = setInterval(() => {

      this.timer();

    }, 1000) // FIN DEL TIMERUPDATE

  } // fin del temporizador


  guardardepositoinversion(idx) {

    this._AuthService.getAuth().subscribe(auth => {

      this.usuariossubscritos.usuarioid = auth.uid
      this.usuariossubscritos.idinversion = idx
      this.usuariossubscritos.montoinvertido = this.forma.value.cantidadinvertida;
      this.usuariossubscritos.fechainversion = firebase.firestore.FieldValue.serverTimestamp()

      // this._AuthService.guardardepositoinversion(this.usuariossubscritos,idx)
      this._AuthService.guardardepositoinversion(this.usuariossubscritos)

    })// fin del hetauth subscribe
  }// fin del guardardeposito inversion

} // fin de la clase
