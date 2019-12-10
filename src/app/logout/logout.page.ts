import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
    userEmail: string;

    constructor(
        private navCtrl: NavController,
        private authService: AuthService) {}
 
    ngOnInit(){
        if (this.authService.userDetails()) {
            this.userEmail = this.authService.userDetails().email; 
        }
        else {
            this.navCtrl.navigateBack('/home');
        }
    }

    logout(){
        this.authService.logoutUser().then(res => {
            this.navCtrl.navigateBack('');
        }).catch(error => {
            console.log(error);
        })
    }
}
