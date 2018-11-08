import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  informacion = [];
  fecha = '';
  

  constructor(public _ActivatedRoute:ActivatedRoute,
              public _AuthService:AuthService) {

    this._ActivatedRoute.params.subscribe(params =>{
      // console.log(params.id);
      this._AuthService.obtenerInformacion(params.id).subscribe(inversiones =>  {
        // console.log(inversiones);
        this.informacion=inversiones;
        console.log("info",this.informacion);

        let segundos = this.informacion[0].fecha.seconds;
        console.log("segundos",segundos);
        
// para las fechas tengo que ponerlo en milisegundos
        let d = new Date(segundos*1000);
        let dia = d.getDate();
        let mes = d.getMonth()+1;
        let ano = d.getFullYear();
        this.fecha = `${dia}-${mes}-${ano}`
        console.log("fecha",this.fecha);
        
      })
      
    })

  }

  ngOnInit() {

  }

}
