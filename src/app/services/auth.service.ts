import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of} from 'rxjs';


import { map, switchMap} from 'rxjs/operators'





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userCollection: AngularFirestoreCollection<any>;
  empresaCollection: AngularFirestoreCollection<any>;
  inverCollection: AngularFirestoreCollection<any>;
  newinverCollection: AngularFirestoreCollection<any>;

  itemDoc: AngularFirestoreDocument<any>;
  inversiones: Observable<any[]>;
  users: Observable<any[]>;
  usersubs: Observable<any[]>;
  userDoc : AngularFirestoreDocument<any>
  inversionDoc: AngularFirestoreDocument<any>

  user$: Observable<any>

  idGuard;

  constructor(public _AngularFireAuth:AngularFireAuth, public _AngularFirestore:AngularFirestore) {

//======================================================================================================================================//
     //////////////////// admin guard aqui se guia del documento///////
     /// Get auth data, then get firestore user document || null
     this.user$ = this._AngularFireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this._AngularFirestore.doc<any>(`usuarios/${this.idGuard}`).valueChanges()
        } else {
          return of(null)
        }
      }))


  }
//======================================================================================================================================//

//======================================================================================================================================//
//traer la data de la base de datos :v
  obtenerUser() {

    this.userCollection = this._AngularFirestore.collection('usuarios');
    return this.users = this.userCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          //  console.log(data);
          return data
        })
      ))
  }
//======================================================================================================================================//

//======================================================================================================================================//
  obtenerInversiones() {

    this.inverCollection = this._AngularFirestore.collection('Inversiones');
    return this.inversiones = this.inverCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          // console.log(data);
          return data

        })
      ))
  }
//======================================================================================================================================//



obtenerInversionesproceso(){

  this.userCollection=this._AngularFirestore.collection('Inversiones', ref => ref.where('estado', '==' , 'proceso'));

  return this.users = this.userCollection.snapshotChanges().pipe(
    map(actions =>
       actions.map(a=>{
        const data = a.payload.doc.data() ;
        data.id = a.payload.doc.id;
       //console.log(data);
        return data
      })
    ))

    } // fin de obetenerinversionesproceso

//======================================================================================================================================//


obtenerInversionesfinalizadas(){

  this.userCollection=this._AngularFirestore.collection('Inversiones', ref => ref.where('estado', '==' , 'finalizada'));

  return this.users = this.userCollection.snapshotChanges().pipe(
    map(actions =>
       actions.map(a=>{
        const data = a.payload.doc.data() ;
        data.id = a.payload.doc.id;
       //console.log(data);
        return data
      })
    ))

}// fin de einversionesfinalizadas


obtenerusuariossubscritos(){

  this.inverCollection = this._AngularFirestore.collection('UsuariosSubscritos');

  return this.users = this.inverCollection.snapshotChanges().pipe(
    map((actions) => {
      return actions.map(a => {
      const data = a.payload.doc.data();
      data.id = a.payload.doc.id;
      
      // console.log("data",data);

      return data;
      
    })}));

}

//======================================================================================================================================//
//PARA OBTENER EL ID DEL COMPONENTE PARA EL GUARD
  obtenerId(id) {

    this.idGuard = id
    // console.log(this.idGuard)
  }
//======================================================================================================================================//

//======================================================================================================================================//
  // registrar correo para logeo
  registerUser(email: string, pass:string){
    return new Promise((resolve,reject)=>{
      this._AngularFireAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then (userData=> resolve(userData),
      err => reject (err));
    })
  }
//======================================================================================================================================//

//======================================================================================================================================//
  // logeo usuario
  loginEmail(email: string, pass:string){
    return new Promise((resolve,reject)=>{
      this._AngularFireAuth.auth.signInWithEmailAndPassword(email, pass)
      .then (userData=> resolve(userData),
      err => reject (err));
    })
  }
//======================================================================================================================================//

//======================================================================================================================================//
  // ver si esta autenticado o no y la info del authxd
  getAuth(){
    return this._AngularFireAuth.authState.pipe(map(auth=>auth))
  }
//======================================================================================================================================//

//======================================================================================================================================//
  // salir xd
  logout(){
    return this._AngularFireAuth.auth.signOut();
  }
//======================================================================================================================================//

//======================================================================================================================================//
  agregarusuario(usuario,uid){
    // console.log('nuevo usuario');    
    this.userCollection = this._AngularFirestore.collection('usuarios');
    this.userCollection.doc(uid).set(usuario)
    console.log(usuario)
  }
  agregarempresa(empresa,uid){
    // console.log('nuevo usuario');
    this.userCollection = this._AngularFirestore.collection('usuarios');
    this.userCollection.doc(uid).set(empresa)
    console.log(empresa)
  }
//======================================================================================================================================//

//======================================================================================================================================//
  agregarInversion(inversion){
    this.inverCollection=this._AngularFirestore.collection('Inversiones');
    this.inverCollection.add(inversion)
  }
//======================================================================================================================================//

agregaridinversion(idx){

  // console.log(idx);
  
  this.inversionDoc = this._AngularFirestore.doc(`Inversiones/${idx.id}`);
  this.inversionDoc.update(idx);
}

///////////////////////////
  // guardardepositoinversion(newinversion,idx){
  //   this.newinverCollection = this._AngularFirestore.collection(`Inversiones/${idx}/UsuariosSubscritos`)
  //   this.newinverCollection.add(newinversion)
  // }// fin de guardardepositoinversion

  guardardepositoinversion(newinversion){
    this.newinverCollection = this._AngularFirestore.collection('UsuariosSubscritos')
    this.newinverCollection.add(newinversion)
  }// fin de guardardepositoinversion

  //======================================================================================================================================//
obtenerInformacion(idx){

  this.userCollection=this._AngularFirestore.collection('Inversiones', ref => ref.where('id', '==' , `${idx}`));

  return this.users = this.userCollection.snapshotChanges().pipe(
    map(actions =>
       actions.map(a=>{
        const data = a.payload.doc.data() ;
        data.id = a.payload.doc.id;
       //console.log(data);
        return data
      })
    ))
}
//======================================================================================================================================// 



}
