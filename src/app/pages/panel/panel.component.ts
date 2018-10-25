import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  usuarios=[]
  emailUsuario;
  lol;

  constructor(public _AuthService:AuthService) {
  
  }

  ngOnInit() {

    
////para obtener los usuarios
    this._AuthService.obtenerUser().subscribe(data =>{
      this.usuarios = data;
      console.log(data)
      
      this.identificarId()

      });
      


          


    

}

identificarId(){

  this._AuthService.getAuth().subscribe(auth =>{
    if(auth){
     
      this.emailUsuario = auth.email;

      for (let iterator of this.usuarios) {
        if (iterator.email === this.emailUsuario) {
          // console.log(iterator.id)
          this.lol = iterator.id
        }
        }
    } 
 
    this._AuthService.obtenerId(this.lol)
  })

  }

}





