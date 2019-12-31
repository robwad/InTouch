import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserCrudService } from '../services/usercrud.service'
import { OrgCrudService } from '../services/orgcrud.service'
import * as firebase from "firebase/app";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	validations_form: FormGroup;
	errorMessage: string = '';
	successMessage: string = '';
	validation_messages = {
		'email': [
		    { type: 'required', message: 'Email is required.' },
		    { type: 'pattern', message: 'Enter a valid email.' }],
		'password': [
		    { type: 'required', message: 'Password is required.' },
		    { type: 'minlength', message: 'Password must be at least 6 characters long.' }]
	};
	email: any;
	orgs: any;
	choice: any;

	constructor(
		private navCtrl: NavController,
    	private authService: AuthService,
    	private formBuilder: FormBuilder,
    	private userCrud: UserCrudService,
        private orgCrud: OrgCrudService) { }

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

        // populate orgs drop down menu
  		this.orgCrud.read_Orgs().subscribe(data => {
  			this.orgs = data.map(e => {
                let name = e.payload.doc.data()['name']
                if (!name){ name = "hello" }
                return {
		            id: e.payload.doc.id,
		            Name: name
                };
            })
		});
    }

    // add user login details to auth db
    tryRegister(value){
        this.authService.registerUser(value).then(res => {
            this.errorMessage = "";
            this.successMessage = "Your account has been created. Please log in.";
        }, err => {
            this.errorMessage = err.message;
            this.successMessage = "";
        })
    }

    // redirects to login page
    goLoginPage(){
        this.navCtrl.navigateBack('/login');
    }

    // adds the new user to the users db
    CreateRecord() {
        let record = {};
        record['email'] = this.email;
        record['language'] = 'english';
        record['org'] = this.choice;
        this.userCrud.create_NewUser(record).then(resp => {
        // possibly add a this.email = "";
        // this.studentName = "";
        // this.studentAge = undefined;
        // this.studentAddress = "";
        }).catch(error => {
            console.log(error);
        });
    }
}
