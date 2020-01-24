import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../services/translate.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.page.html',
  styleUrls: ['./languages.page.scss'],
})
export class LanguagesPage implements OnInit {
  
  selectedLanguage:string;

  constructor(private translateService: TranslationService) { 
  }

  ngOnInit() {
  }

  languageChanged(){
    this.translateService.setLanguage(this.selectedLanguage);
    console.log("language changed to:", this.selectedLanguage)
  }
}
