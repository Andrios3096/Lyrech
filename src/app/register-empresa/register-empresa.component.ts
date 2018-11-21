import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-empresa',
  templateUrl: './register-empresa.component.html',
  styleUrls: ['./register-empresa.component.css']
})
export class RegisterEmpresaComponent implements OnInit {
  
  forma:FormGroup;



 usuario = {
   nombre: '',
   email: '',
   identidad :'',
   telefono:'',
   rup:'',
   roles:''
 }

 usuarioUid;

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
    // this._AuthService.obtenerUser().subscribe(data =>{
    //   console.log(data)
    // });
      
    this.forma = new FormGroup({

      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      identidad: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      rup: new FormControl(null, Validators.required),
      pass1: new FormControl(null, Validators.required),
      pass2: new FormControl(null, Validators.required),

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

    this._AuthService.getAuth().subscribe(auth =>{

      if(auth){
       
        this.usuarioUid = auth.uid;
        this.usuario.nombre =this.forma.value.nombre,
        this.usuario.email = this.forma.value.email,
        this.usuario.telefono = this.forma.value.telefono,
        this.usuario.rup = this.forma.value.rup,
        this.usuario.roles = 'empresa'

        console.log("empresa",this.usuario);
        
        this._AuthService.agregarusuario(this.usuario, this.usuarioUid)

      }
    })
  }

  funciondeagregar(){
    this.registrarUsuario();
    this.guardarDatos();
  }


}
