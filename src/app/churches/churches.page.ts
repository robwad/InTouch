import { Component, OnInit } from '@angular/core';

import { GroupCrudService } from '../services/groupcrud.service'
import { UserCrudService } from '../services/usercrud.service'
import { AuthService } from '../services/auth.service'

import * as firebase from "firebase/app";
@Component({
  selector: 'app-churches',
  templateUrl: './churches.page.html',
  styleUrls: ['./churches.page.scss'],
})
export class ChurchesPage implements OnInit {
    groups: any;
    user: any;
    users: any;
    user_org: any;
    display_groups: any;

    constructor(private groupCrud: GroupCrudService,
        private userCrud: UserCrudService,
        private authService: AuthService) { }

    ngOnInit() {
        // get current user
        firebase.auth().onAuthStateChanged( user => {
            if (user) { this.user = user }
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
                }
            }
        });
        // display the groups in the current user's organization
        this.groupCrud.read_Group().subscribe(data => {
            this.groups = data.map(e => {
                let uid = this.user.uid;
                let uid_list = e.payload.doc.data()['user_ids']
        	    if (!uid_list){
        		    uid_list = {}
        	    }
                return {
                    id: e.payload.doc.id,
                    Name: e.payload.doc.data()['name'],
                    UserIDs: uid_list,
                    isOn: uid in uid_list,
                    Org: e.payload.doc.data()['org'],
                };
            })
            this.display_groups = []
            for (let g of this.groups) {
                if (g.Org == this.user_org) {
                    this.display_groups.push(g)
                }
            }
        });
    }

    // update the groups db when user (un)subscribes
    UpdateUserSubs(group) {
    	let uid = this.user.uid;
    	let previous = {};
    	if (group.UserIDs) {
    		previous = group.UserIDs
    	}
    	if (group.isOn) {
    		// insert current_uid in previous userIDS
    		previous[uid] = "dummy"
    	}
    	else {
    		// remove current_uid from previous userIDS
    		delete previous[uid]
    	}
        let record = {};
    	record['user_ids'] = previous;
	    this.groupCrud.update_Group(group.id, record);
	    // group.isOn = false;
    }
}


