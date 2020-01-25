import { Component } from '@angular/core';


import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuthModule } from '@angular/fire/auth';

// fcm module
import { FcmService } from './services/fcm.service';
import { ToastController } from '@ionic/angular';
import { TranslationService } from './services/translate.service'
import * as firebase from "firebase/app";


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
      title: 'Groups',
      url: '/groups',
      icon: 'home'
    },
    {
      title: 'Add Group',
      url: '/add-group',
      icon: 'add'
    },
    {
      title: 'Manage Groups',
      url: '/manage-groups',
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

  userID: any;
  lang: any;
  stored_lang: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private db: AngularFirestore,
    public afAuth: AngularFireAuthModule,
    private fcm: FcmService,
    public toastController: ToastController,
    private translateService: TranslationService,
    private firestore: AngularFirestore
  ) {
    this.initializeApp();
    // let throwaway = this.translateService.getDefaultLanguage();    
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
      (msg) => {
        console.log("notification received")
        if (this.platform.is('ios')) {
          this.presentToast(msg.aps.alert);
        } else {
          this.presentToast(msg.body);
        }
      });
  }

  private setLanguage(){
    firebase.auth().onAuthStateChanged( user => {
        if (user){ 
            this.userID = user.uid
        }
        console.log("this is the uid", this.userID)

        this.firestore.collection('devices').snapshotChanges().subscribe(data => {
          this.lang = data.map(dev => {
            return {
              lan: dev.payload.doc.data()['language'],
              id: dev.payload.doc.id
            } 
          })
          for (let i of this.lang) {
            if (i.id == this.userID) {
              this.stored_lang = i.lan
            }
          }
          let throway1 = this.translateService.setLanguage(this.stored_lang);    
        })
    });

    let throwaway = this.translateService.getDefaultLanguage();  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
          this.notificationSetup();
      } 
      this.setLanguage()
    //   else {
    // // fallback to browser APIs
    //   }
    });
  }
}
