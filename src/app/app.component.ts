import { Component } from '@angular/core';


import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuthModule } from '@angular/fire/auth';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Register',
      url: '/register',
      icon: 'list'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'person'
    },
    {
      title: 'Churches',
      url: '/churches',
      icon: 'home'
    },
    {
      title: 'Add Church',
      url: '/add-church',
      icon: 'add'
    },
    {
      title: 'Manage Churches',
      url: '/manage-churches',
      icon: 'settings'
    },
    {
      title: 'Languages',
      url: '/languages',
      icon: 'globe'
    },
    {
      title: 'Log Out',
      url: '/logout',
      icon: 'log-out'
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private db: AngularFirestore,
    public afAuth: AngularFireAuthModule


  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
