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
	user_org: any;
    user: any;
    users: any;

    constructor(private groupCrud: GroupCrudService,
        private userCrud: UserCrudService) { }

    ngOnInit() {
        // get current user
  	    firebase.auth().onAuthStateChanged( user => {
  		    if (user) { 
                this.userID = user.uid
                this.user = user
            }
  	    });

        // get current user's Organization
        this.userCrud.read_Users().subscribe(data => {
            this.users = data.map(e => {
                let uid = this.user.uid;
                return {
                    id: e.payload.doc.id,
                    Email: e.payload.doc.data()['email'],
                    Org: e.payload.doc.data()['org']
                };
            })
            for (let i of this.users) {
                if (i.Email == this.user.email) {
                    this.user_org = i.Org 
                     console.log(this.user_org)
                }
            }
        });
    }

    // add the new group to the db
    AddGroup() {
        let record = {
            name: this.New_Name,
  		    owner: this.userID,
            org: this.user_org
        }
        this.groupCrud.create_NewGroup(record)
    }
}
