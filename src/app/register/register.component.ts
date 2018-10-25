import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  forma:FormGroup;

  perro =[]

 usuario = {
   nombre: '',
   email: '',
   identidad :''
 }

  constructor(public _AuthService:AuthService) { }


  // funcion para ver si son iguales las contrase;as
  sonIguales(campo1: string, campo2: string){

    return (group: FormGroup) => {
      let p1 = group.controls[campo1].value;
      let p2 = group.controls[campo2].value;

        if (p1 === p2){
          return null
        }
      return {
        sonIguales:true
      };
    };
  }
  ////////////

  //------------------------//
  ngOnInit() {

    //datos de la base de tos traer
    this._AuthService.obtenerUser().subscribe(data =>{
      console.log(data)
    });
      
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      identidad: new FormControl(null, Validators.required),
      pass1: new FormControl(null, Validators.required),
      pass2: new FormControl(null, Validators.required)
    }, {validators: this.sonIguales('pass1','pass2')})

  }


  registrarUsuario(){

    if (this.forma.valid) {
      
      this._AuthService.registerUser(this.forma.value.email, this.forma.value.pass1)
      .then((res =>{
        console.log('bien perro');
        // console.log(this.forma.value);
        // console.log(this.forma.valid);
        console.log(res);
      })). catch ((err)=>{
        console.log(err);
        
      })

    }
  }

  guardarDatos(){

    this.usuario.nombre =this.forma.value.nombre,
    this.usuario.email = this.forma.value.email,
    this.usuario.identidad = this.forma.value.identidad
 
    this._AuthService.agregardata(this.usuario)
    
  }

  funciondeagregar(){
    this.registrarUsuario();
    this.guardarDatos();
  }

}
