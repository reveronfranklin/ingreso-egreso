import { compileNgModule } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
    private firestore: AngularFirestore) { }


  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);

    });
  }

  crearUsuario(nombre: string, email: string, password: string) {

    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(fbuser => {
        const newUser = new Usuario(fbuser.user.uid, nombre, fbuser.user.email);
        return this.firestore.doc(`${fbuser.user.uid}/usuario`)
          .set({ ...newUser });

      });

  }

  loginUsuario(email: string, password: string) {

    return this.auth.signInWithEmailAndPassword(email, password);

  }

  logOut() {

    return this.auth.signOut();

  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbuser => fbuser != null)
    );
  }


}
