import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  inversiones = []
  usuarios = []
  emailUsuario;
  idusuario;
  fechaapi;
  dias = []


  fechaslimite = []
  fechaactual
  fechamostrada = []
  fecha;


  usuarioactivo
  btninvertir:boolean = false

  timerUpdate

  constructor(public _AuthService: AuthService,
    public _Router: Router,
    public _http: HttpClient) {

      this.obtenerInversiones();
      this.obtenerUsuarios();
      this.obtenerfechaapi();
  }

  ngOnInit() {

    this.temporizador()

  } // FIN DEL NGONIT

  ngOnDestroy() {
    clearInterval(this.timerUpdate);
    this.fechaapi.unsubscribe();
    
  } // fin del ngondestroy

  //para obtener el id de la persona logeada======================================================================================================================================//
  identificarId() {

    this._AuthService.getAuth().subscribe(auth => {

      if (auth) {

        this.emailUsuario = auth.email;

        for (let iterator of this.usuarios) {
          if (iterator.email === this.emailUsuario) {
            // console.log(iterator.id)
            this.idusuario = iterator.id
            this.usuarioactivo = iterator
          }
        }
        console.log(this.usuarioactivo);

        if (this.usuarioactivo.tipo == 'usuario') {
          this.btninvertir = true
        } // fin del if
      }
      this._AuthService.obtenerId(this.idusuario)
      //console.log("sss",this.idusuario);

    })
  } //fin de identificarId

  //envia el id a la pagina de informacion para su recogido ======================================================================================================================================//
  verInformacion(idx) {
    // console.log(idx);
    this._AuthService.agregaridinversion(idx)
    
    this._Router.navigate(['/informacion', idx.id])
    
  } // fin de verInformacion

  obtenerUsuarios(){
    this._AuthService.obtenerUser().subscribe(data => {
      this.usuarios = data;
      // console.log(data)

      this.identificarId()

    });
  } // fin del obtenerUsuarios

  obtenerInversiones(){

    this._AuthService.obtenerInversionesproceso().subscribe((data:any) => {
      this.inversiones = data;
      console.log(this.inversiones)

      for (const iterator of this.inversiones) {
        this.fechaslimite.push(iterator.plazo)
      }
      console.log(this.fechaslimite);
      
    });
  } // fin de obtener inversiones

  obtenerfechaapi() {

    this.fechaapi = this._http.get('http://api.timezonedb.com/v2.1/get-time-zone?key=H1KWE6XJEXVS&format=json&by=zone&zone=America/Lima')
      .subscribe((data: any) => {

        this.fecha = data.timestamp
        this.timer();

        // console.log(this.inversiones);
      }); //fin del subscribe fechaapi

  } // fin de obtenerfechaapi


  timer(){
    this.fecha = this.fecha + 1;
    this.fechamostrada = []

    for (const iterator of this.fechaslimite) {

      this.fechaactual = (iterator - this.fecha + 1000)
      let Seconds: any = ('0' + Math.floor(this.fechaactual % 60)).slice(-2)
      let Minutes: any = ('0' + Math.floor(this.fechaactual / 60 % 60)).slice(-2)
      let Hours: any = ('0' + Math.floor(this.fechaactual / 3600 % 24)).slice(-2)
      let Days = Math.floor(this.fechaactual / (3600 * 24));

      console.log(`${Days}-${Hours}-${Minutes}-${Seconds}`);

      this.fechamostrada.push(`${Days} Dias - ${Hours} horas - ${Minutes} minutos - ${Seconds} segundos`)
      this.dias.push(Days)

    } // fin del por de fechaslimite

  } // fin del timer

  temporizador() {

    this.timerUpdate = setInterval(() => {

      this.timer()

    }, 1000) // FIN DEL TIMERUPDATE

  } // fin del temporizador


} //fin de la clase panelmcomponent





