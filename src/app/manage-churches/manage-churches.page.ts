import { Component, OnInit } from '@angular/core';
import { GroupCrudService } from '../services/groupcrud.service'
import * as firebase from "firebase/app";

@Component({
  selector: 'app-manage-churches',
  templateUrl: './manage-churches.page.html',
  styleUrls: ['./manage-churches.page.scss'],
})
export class ManageChurchesPage implements OnInit {
	groups: any;
	user: any;

  constructor(private groupCrud: GroupCrudService) { }

  ngOnInit() {
	firebase.auth().onAuthStateChanged( user => {
  		if (user) { this.user = user }
  	});


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
          Owner: e.payload.doc.data()['owner'],
          Subs: uid_list,
          Org: "dummyOrg"
        };
      })
    });
    console.log(this.groups);

  }

}


