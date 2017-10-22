import { Injectable , EventEmitter} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { NgZone } from '@angular/core';

import {Credencial} from "../../models/credencial";

/*
  Generated class for the CadastrarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()


export class CadastroProvider {
  data: any;
  zone: NgZone;

  cadastroSucessoEventEmiter:EventEmitter<any>;
  cadastroFalhaEventEmiter:EventEmitter<any>;

  constructor(public http: Http) {
    this.cadastroSucessoEventEmiter = new EventEmitter();
    this.cadastroFalhaEventEmiter = new EventEmitter();
  }

  registrarUsuario(credencial:Credencial ) {
    function dataDoCadastro() { // é a data hoje
     var data = new Date();
     var dia = data.getDate();
     var mes = data.getMonth() + 1;
     var ano = data.getFullYear();
     var hora = data.getHours();
     var minutos = data.getMinutes();
     var milesegundos = data.getMilliseconds();
     return [dia, mes, ano].join('/') + ' ' + [hora, minutos,milesegundos].join(':');
    }

    /* Chamada do Firebase para abrir comunicação e passar dados do usuário */

    firebase.auth().createUserWithEmailAndPassword(credencial.email, credencial.senha)
      .then( newUser => {
        firebase.database().ref('/userProfile').child(newUser.uid)
        .set({ email: credencial.email, nome: credencial.nome, dataCadastro: credencial.dataCadastro = dataDoCadastro() });
      })
      .then(resultado => this.callbackSucessoCadastro(resultado))
      .catch(error => this.callbackFalhaCadastro(error))
      .catch(error => console.log(error))
      .catch(resultado => console.log(resultado))
    }

    private callbackFalhaCadastro(error){
      this.cadastroFalhaEventEmiter.emit({ mensagem: error.message})
    }
    private callbackSucessoCadastro(sucess){
      this.cadastroSucessoEventEmiter.emit({ mensagem: "Cadastro realizado com sucesso!"})
    }
}
