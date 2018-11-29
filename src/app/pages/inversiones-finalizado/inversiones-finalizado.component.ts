import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import * as moment from 'moment';

@Component({
  selector: 'app-inversiones-finalizado',
  templateUrl: './inversiones-finalizado.component.html',
  styleUrls: ['./inversiones-finalizado.component.css']
})
export class InversionesFinalizadoComponent implements OnInit {

  inversiones=[];
  arrayfinalizado=[];

  usuariossubs
  usuarios
  emailUsuario
  usuarioactivo

  idusuario

  mostrarhistorialusuario = false

  arrayinversionesusuario : any=[]

  arraydeinversionesdepositadas: any = []
  inversiones2: any =[]

  constructor(public _AuthService:AuthService) { }

  ngOnInit() {
    this.obtenerInversiones();
    this.obtenertodasInversiones();
    this.obtenerUsuarios()
  }

  obtenerInversiones(){

    this._AuthService.obtenerInversionesfinalizadas().subscribe((data:any) => {
      this.inversiones = data;
      console.log(this.inversiones)

      this._AuthService.getAuth().subscribe(auth => {

      for (const iterator of this.inversiones) {
        if (iterator.usuarioUid == auth.uid) {
          iterator.fecharegistro = moment(iterator.fecharegistro.seconds*1000).format('ll')
          iterator.plazo = moment(iterator.plazo*1000).format('ll')
          this.arrayfinalizado.push(iterator)
        }
        
      }
      console.log(this.arrayfinalizado);
      


    })
      
    });
  } // fin de obtener inversiones


  obtenertodasInversiones(){

    this._AuthService.obtenerusuariossubscritos().subscribe(data => {
      this.usuariossubs = data;
       console.log(this.usuariossubs)

      this._AuthService.getAuth().subscribe(auth => {
        this.arrayinversionesusuario = []
          for (const iterator of this.usuariossubs) {

            if (iterator.usuarioid == auth.uid) {
              this.arrayinversionesusuario.push(iterator)
              
            }
            
          }
          console.log(this.arrayinversionesusuario);

          this._AuthService.obtenerInversionesfinalizadas().subscribe((data:any) => {
            this.inversiones2 = []
            this.inversiones2 = data
            console.log(this.inversiones2);

            

          for (let i = 0; i < this.arrayinversionesusuario.length; i++) {
            
            for (let j = 0; j < this.inversiones2.length; j++) {
              if (this.arrayinversionesusuario[i].idinversion== this.inversiones2[j].id) {
                this.inversiones2[j].fecharegistro = moment(this.inversiones2[j].fecharegistro.seconds*1000).format('ll')
                this.inversiones2[j].plazo = moment(this.inversiones2[j].plazo*1000).format('ll')
                this.arraydeinversionesdepositadas.push(this.inversiones2[j]);
                
              }
            }

          }
          console.log(this.arraydeinversionesdepositadas);
          
        })
        
      })

    });
  } // fin de obtener inversiones


  obtenerUsuarios(){
    this._AuthService.obtenerUser().subscribe(data => {
      this.usuarios = data;
      // console.log(data)

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
            this.mostrarhistorialusuario = true
          } // fin del if
        }
        this._AuthService.obtenerId(this.idusuario)
        //console.log("sss",this.idusuario);
  
      })
      

    });
  } // fin del obtenerUsuarios




}
