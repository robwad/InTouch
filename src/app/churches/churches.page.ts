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
	subs: any;
	userData: any;
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
      	// if (this.user_id in this.UserIDs):
      	// //   let toggle = True
        return {
          id: e.payload.doc.id,
          Name: e.payload.doc.data()['name'],
          UserIDs: uid_list,
          isOn: uid in uid_list


          // Age: e.payload.doc.data()['Age'],
          // Address: e.payload.doc.data()['Address'],
        };
      })
      console.log("this.groups", this.groups);
    });


    // this.userCrud.read_User(this.user).subscribe(data => {
 
    //   this.userData = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       isOn: false,
    //       Name: e.payload.doc.data()['name'],
    //       // Age: e.payload.doc.data()['Age'],
    //       // Address: e.payload.doc.data()['Address'],
    //     };
    //   })
    //   console.log(this.groups);
    //   console.log(this.user)
    // });
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
	    // record['users_subscribed'] = this.user_id;
	    // record['Owned'] = recordRow.owned;
	    // record['Subscriptions'] = ["hello"];
	    // record['Subscriptions'] = recordRow.subscriptions;
	    console.log("group.id", group.id)
	    this.groupCrud.update_Group(group.id, record);
	    // group.isOn = false;
  }
}
