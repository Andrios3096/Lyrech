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

 usuario = {
   nombre: '',
   email: '',

   documento : {
    tipodocumento:'',
    numerodocumento:''
   },
   telefono:'',
   roles:''
 }


 dni:boolean
 pasaporte:boolean

 usuarioUid;

  constructor(public _AuthService:AuthService) { }

//======================================================================================================================================//
  // funcion para ver si son iguales las contrase;as
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

    //datos de la base de tos traer
    // this._AuthService.obtenerUser().subscribe(data =>{
    //   console.log(data)
    // });
      
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),

      telefono: new FormControl(null, Validators.required),
      pass1: new FormControl(null, Validators.required),
      pass2: new FormControl(null, Validators.required),

      documento: new FormGroup({
        tipodocumento: new FormControl(null),
        numerodocumento: new FormControl(null )
      }),

    }, {validators: this.sonIguales('pass1','pass2')})


     this.forma.valueChanges
     .subscribe(data =>{
      //  console.log(data)

        if (data.documento.tipodocumento == 'DNI') {
          this.dni = true
          this.pasaporte =false
        } else {
          this.pasaporte = true
          this.dni =false
        }
     })


  }

//======================================================================================================================================//
  registrarUsuario() {

    if (this.forma.valid) {

      this._AuthService.registerUser(this.forma.value.email, this.forma.value.pass1)
        .then((res => {
          console.log('bien perro');
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

// traertipo(tipo){
//   console.log(tipo)
//   if (tipo ==  1) {
//     this.dni = true
//     this.pasaporte =false
//     console.log(tipo)
//   } else {
//     this.pasaporte = true
//     this.dni =false
//   }
// }

//======================================================================================================================================//


//======================================================================================================================================//
  guardarDatos() {

    this._AuthService.getAuth().subscribe(auth => {
      
      if (auth) {

        this.usuarioUid = auth.uid;
        this.usuario.nombre = this.forma.value.nombre,
        this.usuario.email = this.forma.value.email,

        this.usuario.documento = this.forma.value.documento

        this.usuario.telefono = this.forma.value.telefono,
        this.usuario.roles = 'usuario'
        // console.log(this.usuario);
        

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
