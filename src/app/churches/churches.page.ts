import { Component, OnInit } from '@angular/core';

import { GroupCrudService } from '../services/groupcrud.service'
import { UserCrudService } from '../services/usercrud.service'
import * as firebase from "firebase/app";
@Component({
  selector: 'app-churches',
  templateUrl: './churches.page.html',
  styleUrls: ['./churches.page.scss'],
})
export class ChurchesPage implements OnInit {
	groups: any;
	user: any;

//  user_id = user.id

// 	if (user) {
//   // User is signed in.
// } else {
//   // No user is signed in.
// }

  constructor(private groupCrud: GroupCrudService,
    private userCrud: UserCrudService ) { }

  ngOnInit() {
	this.user = firebase.auth().currentUser;
	console.log("this.user", this.user)
    console.log("this.user.uid", this.user.uid)

    this.groupCrud.read_Group().subscribe(data => {
 
      this.groups = data.map(e => {
    	let uid = this.user.uid;
    	let uid_list = e.payload.doc.data()['user_ids']
    	if (!uid_list){
    		uid_list = {}
    	}
    	console.log("uid", uid)
        return {
          id: e.payload.doc.id,
          Name: e.payload.doc.data()['name'],
          UserIDs: uid_list,
          isOn: uid in uid_list


        };
      })
      console.log("this.groups", this.groups);
    });
  }

    UpdateUserSubs(group) {
    	console.log("group.Name", group.Name)
    	console.log("group.isOn", group.isOn)
    	let uid = this.user.uid;
    	console.log("uid", uid)
    	let record = {};
    	let previous = {};
    	if (group.UserIDs) {
    		previous = group.UserIDs
    	}
    	console.log("previous", previous)
    	if (group.isOn) {
    		// insert current_uid in previous
    		previous[uid] = "dummy"
    	}
    	else {
    		// remove current_uid from previous
    		delete previous[uid]
    	}
    	record['user_ids'] = previous;

	    console.log("group.id", group.id)
	    this.groupCrud.update_Group(group.id, record);
	    // group.isOn = false;
  }
}
