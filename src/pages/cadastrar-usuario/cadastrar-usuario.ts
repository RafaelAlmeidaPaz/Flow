import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {Credencial} from "../../models/credencial";

import { CadastrarProvider } from '../../providers/providers';

import {TabsPage}  from "../tabs/tabs";


@IonicPage()
@Component({
  selector: 'page-cadastrar-usuario',
  templateUrl: 'cadastrar-usuario.html',
})
export class CadastrarUsuarioPage {
  credencial:Credencial;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public cadastroProvider: CadastrarProvider,
    public alertas: AlertController)
    {
      this.credencial = new Credencial();
    }

  registrarUsuario(){
    this.cadastroProvider.registrarUsuario(this.credencial);
  }

  ionViewDidLoad() {
      /* Retorno do Provider caso seja Sucesso*/
      this.cadastroProvider.cadastroSucessoEventEmiter.subscribe(
         sucess => this.navCtrl.setRoot(TabsPage)
      )

      this.cadastroProvider.cadastroFalhaEventEmiter.subscribe(
           error =>
         this.alerta_FalhaCadastro(error, "Erro")
       )

  }

  alerta_FalhaCadastro(value,title){
        let emiteAlerta = this.alertas.create({
        title: title,
        message: JSON.stringify(value),
        buttons: [{text: "Fechar"}]
        });
        emiteAlerta.present();
  }
}
