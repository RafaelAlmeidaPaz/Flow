import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {Credencial} from "../../models/credencial";

import { ResetSenhaProvider } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-reset-senha',
  templateUrl: 'reset_senha.html',
})

export class ResetSenhaPage {
  credencial:Credencial;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public resetSenhaProvider: ResetSenhaProvider, public alertas: AlertController) {
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
