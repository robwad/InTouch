import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../services/translate.service';

import * as firebase from "firebase/app";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.page.html',
  styleUrls: ['./languages.page.scss'],
})
export class LanguagesPage implements OnInit {
  
  selectedLanguage:any;
  userID: any;

  constructor(
  	private translateService: TranslationService,
  	private firestore: AngularFirestore
  	) { }

  ngOnInit() {
  	firebase.auth().onAuthStateChanged( user => {
  		if (user) { this.userID = user.uid }
  	});
  }

  languageChanged(){
  	if (this.selectedLanguage) {
	    this.translateService.setLanguage(this.selectedLanguage);
	    console.log("language changed to:", this.selectedLanguage)
	    let record = {}
	    record["language"] = this.selectedLanguage
	    this.firestore.doc('devices/' + this.userID).update(record);    		
  	}
  }
}
