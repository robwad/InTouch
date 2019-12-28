import { Component, OnInit } from '@angular/core';
import { GroupCrudService } from '../services/groupcrud.service'
import * as firebase from "firebase/app";
import { AngularFirestore } from '@angular/fire/firestore';

// new
import * as admin from 'firebase-admin';
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: "https://church-34afa.firebaseio.com"
// });

@Component({
  selector: 'app-manage-churches',
  templateUrl: './manage-churches.page.html',
  styleUrls: ['./manage-churches.page.scss'],
})
export class ManageChurchesPage implements OnInit {
	groups: any;
	user: any;
	display_groups: any;
    selection: any;
    message: any;
    // new
    registrationToken: any;
    mes: any;

	constructor(private groupCrud: GroupCrudService,
        private firestore: AngularFirestore) { }

  	ngOnInit() {
        // get current user
  		firebase.auth().onAuthStateChanged( user => {
	  		if (user) { this.user = user }
	  	});

        // initialize selection
        this.selection = {};


        // display the groups owned by current user
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
			        Owner: e.payload.doc.data()['owner'],
			        Subs: uid_list,
			        Org: "dummyOrg",
                    isOn: false
			    };
			})
			this.display_groups = []
			for (let i of this.groups) {
				if (i.Owner == this.user.uid) {
					this.display_groups.push(i)
				}
			}
		});

	}

    // update selection, a set of the selected groups
    UpdateSelection(group) {
        if (group.isOn) {
            // insert current_uid in previous userIDS
            this.selection[group.Name] = "dummy"
        }
        else {
            // remove current_uid from previous userIDS
            delete this.selection[group.Name]
        }
        console.log("this.selection", this.selection)
    }

    // get the subs from each selected group, and the message from the textbox
    buildAddressList(){
        console.log("trig")
        if (this.selection){
            console.log("trig2")
            Object.keys(this.selection).forEach(name => {
                for (let group of this.display_groups){
                    if (name == group.Name){
                        console.log("groupName, groupSubs", name, group.Subs)
                        console.log("message", this.message)
                    }
                }
            })
        }
    }

    // new
    hello() {
        // This registration token comes from the client FCM SDKs.
        this.registrationToken = 'cFiwCAD8kTY:APA91bGnDmJe5cXbInsOwY8wUklo0UQ1JuTUwXZg2BQ8ZRORo3sCE';
        this.mes = { 
            data: {
                score: '850',
                time: '2:45'
            },
            token: this.registrationToken
        };

    //     // Send a message to the device corresponding to the provided
    //     // registration token.
    //     admin.messaging().send(this.mes)
    //     .then((response) => {
    //         // Response is a message ID string.
    //         console.log('Successfully sent message:', response);
    //     })
    //     .catch((error) => {
    //         console.log('Error sending message:', error);
    //     });   
    }
    




    // remove the group from the groups db
	deleteGroup(group) {
	  	this.groupCrud.delete_Group(group.id)
	}
}



