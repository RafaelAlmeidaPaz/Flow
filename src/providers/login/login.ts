import { Injectable , EventEmitter} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { NgZone } from '@angular/core';

import {Credencial} from "../../models/credencial";

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  zone: NgZone;
  perfilUsuario: any = null
  autenticado:boolean;

  loginSucessoEventEmitter:EventEmitter<any>;
  loginFalhaEventEmitter:EventEmitter<any>;
  logoutSucessEventEmitter:EventEmitter<any>;
  logoutFalhaEventEmitter:EventEmitter<any>;

  constructor(public http: Http, public ngZone: NgZone)
   {
     this.loginSucessoEventEmitter = new EventEmitter();
     this.loginFalhaEventEmitter = new EventEmitter();
     this.logoutSucessEventEmitter = new EventEmitter();
     this.logoutFalhaEventEmitter = new EventEmitter();

    /* Passa parametros para Firebase */
    firebase.auth().onAuthStateChanged(usuario =>{
           this.callbackStateChange(usuario);
    })


  }

  /* Validação da  Sessão do usuário com o ngZone*/

  private callbackStateChange(usuario){
  this.ngZone.run( () =>
  {
    if (usuario !=null)
    {
      this.perfilUsuario = usuario;
      this.autenticado = true;
    }else
    {
      this.perfilUsuario = null;
      this.autenticado = false;
    }
  })
 }


/* Validação de Dados com o Firebase */
 login_ComEmail(credencial:Credencial){
    firebase.auth().signInWithEmailAndPassword(credencial.email, credencial.senha)
    .then(resultado => this.callbackSucessLogin(resultado))
    .catch(error => this.callbackFalhaLogin(error))
    .catch(error => console.log(error))
    .catch(result => console.log(result))
  }

  logout(): firebase.Promise<void>{
    return firebase.auth().signOut()
      .then(() => this.logoutSucessEventEmitter.emit(true))
      .catch(error => this.callbackFalhaLogout(error))
      .then(resultado => this.callbackLogoutSucess(resultado))
      .catch(error => this.callbackFalhaLogin(error))
      .catch(error => console.log("logou", error))
      .catch(result => console.log("logout", result));
  }


/* Start Métodos de retorno do Login */
private callbackSucessLogin(response){
  this.loginSucessoEventEmitter.emit(response.user);
}
private callbackFalhaLogin(error){
var mensagem = '';

switch(error.message) {
   case 'The email address is badly formatted.': {
     mensagem = 'E-mail incompleto ou mal formatado';
      break;
   }
   case 'The password is invalid or the user does not have a password.': {
     mensagem = 'Email ou senha inválido';
      break;
   }
   case 'There is no user record corresponding to this identifier. The user may have been deleted.':{
     mensagem = 'Usuário não encontrado. Favor validar!';
      break;
  }
  case 'signInWithEmailAndPassword failed: Second argument "password" must be a valid string.':{
    mensagem = 'Senha vazia'
  }
  case 'erraaou' :{
    mensagem = 'eittttaaa jão'
  }
  default: {
    mensagem = 'Usuario ou login não correspondente'
      break;
   }
}

console.log(error)
this.loginFalhaEventEmitter.emit(mensagem)
}
/*End Login*/

/*Start Logout*/
private callbackLogoutSucess(sucess){
  this.logoutSucessEventEmitter.emit({mensagem:sucess})
}
private callbackFalhaLogout(error){
  this.logoutFalhaEventEmitter.emit({mensagem:error})
}
/*End Logout*/

}
