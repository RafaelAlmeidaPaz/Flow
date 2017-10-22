import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';

import {Credencial} from "../../models/credencial";

/* Providers*/
import { LoginProvider } from '../../providers/providers';

/* Pages*/
import {CadastroPage}  from "../cadastro/cadastro";
import {HomePage}  from "../home/home";
import {TabsPage}  from "../tabs/tabs";
import {ResetSenhaPage} from "../reset_senha/reset_senha";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credencial:Credencial;
  userProfile: any = null;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loginprovider: LoginProvider, public alertas: AlertController, private facebook: Facebook)
  {
    this.credencial = new Credencial();
  }


/*
  facebookLogin(): void {
   this.facebook.login(['email']).then( (response) => {
     const facebookCredential = firebase.auth.FacebookAuthProvider
       .credential(response.authResponse.accessToken);

     firebase.auth().signInWithCredential(facebookCredential)
       .then((success) => {
         console.log("Firebase success: " + JSON.stringify(success));
         this.userProfile = success;
       })
       .catch((error) => {
         console.log("Firebase failure: " + JSON.stringify(error));
     });

   }).catch((error) => { console.log(error) });
 }

*/

  criarConta(){
    this.navCtrl.setRoot(CadastroPage)
  }

  /* Passa os parametros do HTML para o Provider validar no Firebase */
  autenticar_Usuario_ComEmail(){
    this.loginprovider.login_ComEmail(this.credencial);
  }

  resetarSenha(){
    this.navCtrl.setRoot(ResetSenhaPage)
  }

  ionViewDidLoad() {
    this.credencial = new Credencial();

    /* Retorno do Provider caso seja Sucesso*/
    this.loginprovider.loginSucessoEventEmitter.subscribe(
       user => this.navCtrl.setRoot(TabsPage)
    )

    this.loginprovider.loginFalhaEventEmitter.subscribe(
         error =>
       this.alerta_FalhaLogin(error, "Problemas no login")
     )

  }

  alerta_FalhaLogin(value,title){
        let emiteAlerta = this.alertas.create({
        title: title,
        message: JSON.stringify(value),
        buttons: [{text: "Fechar"}]
        });
        emiteAlerta.present();
  }

}
