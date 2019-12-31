import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'
import * as firebase from "firebase/app";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    validations_form: FormGroup;
    errorMessage: string = '';
    validation_messages = {
        'email': [
            { type: 'required', message: 'Email is required.' },
            { type: 'pattern', message: 'Please enter a valid email.' }],
        'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 5 characters long.' }]
    };

    constructor(
        private navCtrl: NavController,
        private authService: AuthService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        firebase.auth().onAuthStateChanged( user => {
            if (user) { 
                this.navCtrl.navigateForward('/groups');
            }
          });
        // run validators on inputs
        this.validations_form = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                ])),
            password: new FormControl('', Validators.compose([
                Validators.minLength(6),
                Validators.required
                ])),
        });
    }

    // set the current user in auth db
    loginUser(value){
        this.authService.loginUser(value).then(res => {
            this.errorMessage = "";
            this.navCtrl.navigateForward('/groups');
        }, err => {
            this.errorMessage = err.message;
        })
    }

    // redirect to register
    goToRegisterPage(){
        this.navCtrl.navigateForward('/register');
    }
}
