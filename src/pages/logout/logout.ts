import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginProvider } from '../../providers/providers';

import {TabsPage}  from "../tabs/tabs";
import {LoginPage}  from "../login/login";

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loginprovider: LoginProvider) {
  }

  ionViewDidLoad() {
    this.loginprovider.logout();

    this.loginprovider.logoutSucessEventEmitter.subscribe(
      sucess =>
      this.navCtrl.setRoot(LoginPage)
    )

    /*this.loginprovider.logoutFalhaEventEmitter.subscribe(
      error =>
      this.navCtrl.setRoot(TabsPage)
    )*/

  }

}
