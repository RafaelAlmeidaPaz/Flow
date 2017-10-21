import { NgModule, ErrorHandler } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


import {CadastrarUsuarioPage} from '../pages/cadastrar-usuario/cadastrar-usuario';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { ResetarSenhaPage } from '../pages/resetar-senha/resetar-senha'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginProvider } from '../providers/providers';
import { CadastrarProvider } from '../providers/providers';
import { ResetarSenhaProvider } from '../providers/resetar-senha/resetar-senha';

var config = {
apiKey: "AIzaSyA33AWF5lw3SEu7c2ItRUI1yMiCpvIBozo",
authDomain: "projeto-f69d1.firebaseapp.com",
databaseURL: "https://projeto-f69d1.firebaseio.com",
storageBucket: "projeto-f69d1.appspot.com",
messagingSenderId: "897574862361"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CadastrarUsuarioPage,
    LogoutPage,
    ResetarSenhaPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CadastrarUsuarioPage,
    LogoutPage,
    ResetarSenhaPage
  ],
  providers: [
    StatusBar,
    SplashScreen, Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    CadastrarProvider,
    ResetarSenhaProvider
  ]
})
  export class AppModule {
    constructor(){
      firebase.initializeApp(config);
  }
}
