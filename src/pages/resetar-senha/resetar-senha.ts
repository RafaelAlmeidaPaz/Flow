import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {Credencial} from "../../models/credencial";

import { ResetarSenhaProvider } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-resetar-senha',
  templateUrl: 'resetar-senha.html',
})

export class ResetarSenhaPage {
  credencial:Credencial;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public resetSenhaProvider: ResetarSenhaProvider, public alertas: AlertController) {
    this.credencial = new Credencial();
  }


  resetPassword(){
   this.resetSenhaProvider.resetPassword(this.credencial);
  }


  ionViewDidLoad() {
    this.credencial = new Credencial();
    this.resetSenhaProvider.resetDeSenhaSucessoEventEmitter.subscribe(
      sucess => this.alertaReset(sucess, "Cadastro")
    )
    this.resetSenhaProvider.resetDeSenhaFalhaEventEmitter.subscribe(
      error =>this.alertaReset(error, "Cadastro")
    )
  }


   alertaReset(value,title){
        let emiteAlerta = this.alertas.create({
        title: title,
        message: JSON.stringify(value),
        buttons: [{text: "Fechar"}]
        });
        emiteAlerta.present();
  }

}
