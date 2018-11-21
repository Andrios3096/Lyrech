import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  informacion;
  fecha;
  parametro

  fechalimite= 1542819424

  fechamostrada

  fechaactual

  timerUpdate

  

  constructor(public _ActivatedRoute:ActivatedRoute,
              public _AuthService:AuthService,
              public _Router:Router,
              public _http:HttpClient) {

    this._ActivatedRoute.params.subscribe(params =>{
      // console.log(params.id);
      this._AuthService.obtenerInformacion(params.id).subscribe(inversiones =>  {
        // console.log(inversiones);
        this.informacion=inversiones;
        this.parametro = params.id
        console.log("info",this.informacion);
        console.log("parametros", params);
        

     if (this.informacion.length == 0 ) {

      this._Router.navigate(['/pagenotfound'])
      
   }

        // this.fechahorasdias()
         
        
      })
      
    })

    this.obtenerfechaapi()
    this.temporizador()

  }

  ngOnInit() {

  }

  // verificarurl(){

  // }

  obtenerfechaapi(){

    this._http.get('http://api.timezonedb.com/v2.1/get-time-zone?key=H1KWE6XJEXVS&format=json&by=zone&zone=America/Lima')
    .subscribe( (data:any) => {

      this.fecha = data.timestamp
      

    this.fechaactual = (this.fechalimite - this.fecha +1000)
     let Seconds: any = ('0' + Math.floor(this.fechaactual % 60)).slice(-2)
      let Minutes: any = ('0' + Math.floor(this.fechaactual/60 % 60 )).slice(-2)
      let Hours: any = ('0' + Math.floor(this.fechaactual / 3600 % 24)).slice(-2)
      let Days: any = Math.floor(this.fechaactual / (3600 * 24));

    console.log(`${Days}-${Hours}-${Minutes}-${Seconds}`);

    this.fechamostrada = `${Days} Dias - ${Hours} horas - ${Minutes} minutos - ${Seconds} segundos`



    });

  }


/************************************************************************************************************** */

temporizador(){


 this.timerUpdate = setInterval( () => {

  this.obtenerfechaapi()
 
 
  if(this.fechaactual <= 1) {
    clearInterval(this.timerUpdate);
  }

}, 1000)
}



//     //  let secs = this.horas.getSeconds();
    
    
//     // setTimeout(() => {
//     //   this.obtenersegundos()
//     //   console.log(this.seconds);
//     // }, 1000);


//     // setInterval(()=> this.obtenersegundos() ,1000)
    

//     this.fecha = `${dia}-${mes}-${ano}-${hora}-${minuto}-${this.seconds}`
//     console.log("fecha", this.fecha);
    
    
//     let horapc = new Date()
//     let diapc = horapc.getDate();
//     console.log("fecha",dia);
//     console.log("dia pc",diapc);
//     let diasquedan = dia-diapc;
//     console.log("te quedan", diasquedan);
//   }



}
