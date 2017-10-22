/* Componentes */
import { NgModule, ErrorHandler } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

/* Paginas */

import {CadastroPage} from '../pages/cadastro/cadastro';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { ResetSenhaPage } from '../pages/reset_senha/reset_senha';
import { CardapioPage } from '../pages/cardapio/cardapio';
import { HistoricoPage } from '../pages/historico/historico';
import { DadosUsuarioPage } from '../pages/dados-usuario/dados-usuario';
import { ApresentacaoPage } from "../pages/apresentacao/apresentacao";
import { PedidoPage } from '../pages/pedido/pedido';
import { PagamentoPage } from '../pages/pagamento/pagamento';

/* Providers */

import { LoginProvider, CadastroProvider, ResetSenhaProvider, EmpresaProvider,
HistoricoComprasProvider, DadosUsuarioProvider, PedidoProvider, PagamentoProvider
} from '../providers/providers';

/*Configuração para chamada da API do Firebase*/

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
    CadastroPage,
    LogoutPage,
    ResetSenhaPage,
    CardapioPage,
    HistoricoPage,
    DadosUsuarioPage,
    ApresentacaoPage,
    PedidoPage,
    PagamentoPage

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
    CadastroPage,
    LogoutPage,
    ResetSenhaPage,
    CardapioPage,
    HistoricoPage,
    DadosUsuarioPage,
    ApresentacaoPage,
    PedidoPage,
    PagamentoPage


  ],
  providers: [
    StatusBar,
    SplashScreen, Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    CadastroProvider,
    ResetSenhaProvider,
    EmpresaProvider,
    HistoricoComprasProvider,
    DadosUsuarioProvider,
    PedidoProvider,
    PagamentoProvider
  ]
})
  export class AppModule {
    constructor(){
      firebase.initializeApp(config);
  }
}
