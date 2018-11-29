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

 empresa= {
   nombre: '',
   email: '',
   identidad :'',
   telefono:'',
   rup:'',
   tipo:''
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
//======================================================================================================================================//


  ngOnInit() {

      
    this.forma = new FormGroup({

      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      telefono: new FormControl(null, Validators.required),
      rup: new FormControl(null, Validators.required),
      pass1: new FormControl(null, Validators.required),
      pass2: new FormControl(null, Validators.required),

    }, {validators: this.sonIguales('pass1','pass2')})

  }

//======================================================================================================================================//
  registrarEmpresa(){

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

  //======================================================================================================================================//


  //================================================va guardar en la base de datos======================================================================================//

  guardarDatos(){

    this._AuthService.getAuth().subscribe(auth =>{

      if(auth){
       
        this.usuarioUid = auth.uid;
        this.empresa.nombre =this.forma.value.nombre,
        this.empresa.email = this.forma.value.email,
        this.empresa.telefono = this.forma.value.telefono,
        this.empresa.rup = this.forma.value.rup,
        this.empresa.tipo = 'empresa'

        console.log("empresa",this.empresa);
        
        this._AuthService.agregarempresa(this.empresa, this.usuarioUid)

      }
    })
  }

  //======================================================================================================================================//

  funciondeagregar(){
    this.registrarEmpresa();
    this.guardarDatos();
  }


}
