import { Component, OnInit } from '@angular/core';
import { GroupCrudService } from '../services/groupcrud.service'
import * as firebase from "firebase/app";
import { AuthService } from '../services/auth.service'
import { UserCrudService } from '../services/usercrud.service'

@Component({
  selector: 'app-add-church',
  templateUrl: './add-church.page.html',
  styleUrls: ['./add-church.page.scss'],
})
export class AddChurchPage implements OnInit {
	New_Name: any;
	userID: any;
	user_org;

  constructor(private groupCrud: GroupCrudService,
    private userCrud: UserCrudService
  ) { }

  ngOnInit() {
  	firebase.auth().onAuthStateChanged( user => {
  		if (user) { this.userID = user.uid }
  	});
  }

  AddGroup() {
  	let record = {
  		name: this.New_Name,
  		owner: this.userID
  		// org: fetch org from user using this.user.email
  	}
  	this.groupCrud.create_NewGroup(record)
  }
}
