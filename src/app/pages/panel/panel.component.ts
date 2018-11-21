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

  inversiones=[]
  usuarios=[]
  emailUsuario;
  idusuario;
 

  fechalimite:any = [1542819424,1543121373,1543553373,1546145373,1543121373,1545698973]
  fechaactual
  fechamostrada=[]
  fecha;

  timerUpdate

  constructor(public _AuthService:AuthService,
              public _Router:Router,
              public _http:HttpClient) {

                this._AuthService.obtenerInversiones().subscribe(data =>{
                  this.inversiones = data;
                  console.log(this.inversiones)
                  
                  });
  
  }

  ngOnInit() {

//para obtener las inversiones======================================================================================================================================//


//para obtener las usuarios======================================================================================================================================//
    this._AuthService.obtenerUser().subscribe(data =>{
      this.usuarios = data;
      // console.log(data)

      this.identificarId()

      });

      this.obtenerfechaapi()
      this.temporizador()

}

//para obtener el id de la persona logeada======================================================================================================================================//
identificarId(){

  this._AuthService.getAuth().subscribe(auth =>{

    if(auth){

      this.emailUsuario = auth.email;

      for (let iterator of this.usuarios) {
        if (iterator.email === this.emailUsuario) {
          // console.log(iterator.id)
          this.idusuario = iterator.id
        }
      }
    }
    this._AuthService.obtenerId(this.idusuario)
    // console.log("sss",this.idusuario);
    
  })
  }

//envia el id a la pagina de informacion para su recogido ======================================================================================================================================//
  verInformacion(idx){
    // console.log(idx);
    this._Router.navigate(['/informacion', idx.id])
  }





  obtenerfechaapi(){

    this._http.get('http://api.timezonedb.com/v2.1/get-time-zone?key=H1KWE6XJEXVS&format=json&by=zone&zone=America/Lima')
    .subscribe( (data:any) => {

        this.fechamostrada = []

      this.fecha = data.timestamp
      
      for (const iterator of this.fechalimite) {
        
      

    this.fechaactual = (iterator- this.fecha +1000)
     let Seconds: any = ('0' + Math.floor(this.fechaactual % 60)).slice(-2)
      let Minutes: any = ('0' + Math.floor(this.fechaactual/60 % 60 )).slice(-2)
      let Hours: any = ('0' + Math.floor(this.fechaactual / 3600 % 24)).slice(-2)
      let Days: any = Math.floor(this.fechaactual / (3600 * 24));

    console.log(`${Days}-${Hours}-${Minutes}-${Seconds}`);


    this.fechamostrada.push (`${Days} Dias - ${Hours} horas - ${Minutes} minutos - ${Seconds} segundos`)

    }
    // console.log(this.inversiones);
    });

  }

    temporizador(){


      this.timerUpdate = setInterval( () => {
   
       this.obtenerfechaapi()
    
    
       if(this.fechaactual <= 1) {
         console.log('la oferta acabo')
         clearInterval(this.timerUpdate);
       }
   
     }, 1000)

     }


 }





