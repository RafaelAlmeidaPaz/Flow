import { Injectable , EventEmitter} from '@angular/core';
import firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Credencial} from "../../models/credencial";

/*
  Generated class for the ResetarSenhaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResetSenhaProvider {

  resetDeSenhaSucessoEventEmitter:EventEmitter<any>
  resetDeSenhaFalhaEventEmitter:EventEmitter<any>;

  constructor(public http: Http) {
    this.resetDeSenhaSucessoEventEmitter = new EventEmitter();
    this.resetDeSenhaFalhaEventEmitter = new EventEmitter();
  }

  resetPassword(credencial:Credencial) {
      var auth = firebase.auth();
      auth.sendPasswordResetEmail(credencial.email)

      .then(resultado => this.callbackResetDeSenha(resultado))
      .catch(error => this.callbackFalhaResetDeSenha(error))
      .catch(error => console.log(error))
      .catch(result => console.log(result))
  }

  private callbackResetDeSenha(sucess){
    this.resetDeSenhaSucessoEventEmitter.emit({mensagem:"Enviamos um email para você com as instruções!"})
  }

  private callbackFalhaResetDeSenha(error){
    var mensagem = '';

    switch(error.message) {
       case 'The email address is badly formatted.': {
         mensagem = 'E-mail incompleto ou mal formatado';
          break;
       }
       case 'There is no user record corresponding to this identifier. The user may have been deleted.':{
         mensagem = 'E-mail não encontrado em nosso sistema';
          break;
       }

      default: {
        mensagem = 'Dados incompletos'
          break;
       }
    }
    console.log(error)
    this.resetDeSenhaFalhaEventEmitter.emit(mensagem)
  }

}
