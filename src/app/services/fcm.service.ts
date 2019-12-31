import { Injectable } from '@angular/core';

import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
// new
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

    uid: any;

  constructor(
      private firebase: FirebaseX,
      private afs: AngularFirestore,
      private platform: Platform
      ) { }

  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }

    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) return;
    
    firebase.auth().onAuthStateChanged( user => {
        if (user){ 
            this.uid = user.uid
        }
        console.log("this is the uid", this.uid)

        const devicesRef = this.afs.collection('devices');

        const data = {
          token,
          userId: this.uid
        };

        return devicesRef.doc(this.uid).set(data);
    });

  }

  onNotifications() {
    return this.firebase.onMessageReceived();
  }
}
