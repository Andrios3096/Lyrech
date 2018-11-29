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
  dni:boolean
  pasaporte:boolean
  usuarioUid;


 usuario = {
   nombre: '',
   email: '',
   documento : {
    tipodocumento:'',
    numerodocumento:''
   },
   telefono:'',
   tipo:''
 }




  constructor(public _AuthService:AuthService) { }

//=========================================================funcion para ver si son iguales las contrase;as===================================================================//
 
  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {
      let p1 = group.controls[campo1].value;
      let p2 = group.controls[campo2].value;

      if (p1 === p2) {
        return null
      }
      return {
        sonIguales: true
      };
    };
  }
//======================================================================================================================================//



//======================================================================================================================================//
  ngOnInit() {

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      telefono: new FormControl(null, Validators.required),
      pass1: new FormControl(null, Validators.required),
      pass2: new FormControl(null, Validators.required),

      documento: new FormGroup({
        tipodocumento: new FormControl(null, Validators.required),
        numerodocumento: new FormControl(null, Validators.required )
      }),

    }, 
    {validators: this.sonIguales('pass1','pass2')})

//======================VA VERIFICAR SI ESCOGE DNI O PASAPORTE================================================================================================================//
     this.forma.valueChanges
     .subscribe(data =>{

        if (data.documento.tipodocumento == 'DNI') {
          this.dni = true
          this.pasaporte =false
        } else {
          this.pasaporte = true
          this.dni =false
        }
     })
//======================================================================================================================================//

  }

//======================================Registrar Usuarios================================================================================//
  registrarUsuario() {

    if (this.forma.valid) {

      this._AuthService.registerUser(this.forma.value.email, this.forma.value.pass1)
        .then((res => {
          console.log('Registrado Exitosamente');
          // console.log(this.forma.value);
          // console.log(this.forma.valid);
          console.log(res);
        })).catch((err) => {
          console.log(err);

        })
    }
  }
//======================================================================================================================================//


//======================================================================================================================================//

//======================================================================================================================================//


//===============================Guardar en la base de datos=============================================================================//
  guardarDatos() {

    this._AuthService.getAuth().subscribe(auth => {
      
      if (auth) {

        this.usuarioUid = auth.uid;
        this.usuario.nombre = this.forma.value.nombre,
        this.usuario.email = this.forma.value.email,

        this.usuario.documento = this.forma.value.documento

        this.usuario.telefono = this.forma.value.telefono,
        this.usuario.tipo = 'usuario'
        
        console.log(this.usuario);
        
        this._AuthService.agregarusuario(this.usuario, this.usuarioUid)

      }
    })
  }
//======================================================================================================================================//

//======================================================================================================================================//
  funciondeagregar(){
    this.registrarUsuario();
    this.guardarDatos();
  }
//======================================================================================================================================//





}
