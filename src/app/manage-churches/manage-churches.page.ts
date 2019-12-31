import { Component, OnInit } from '@angular/core';
import { GroupCrudService } from '../services/groupcrud.service'
import * as firebase from "firebase/app";
import { AngularFirestore } from '@angular/fire/firestore';
// new
import { DeviceCrudService } from '../services/devicecrud.service'
import { HttpClient } from "@angular/common/http";
// import * as admin from 'firebase-admin';
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
    postdata: any;
    sender_org: any;
    all_subs: any;
    regTokenlist: any;

	constructor(private deviceCrud: DeviceCrudService,
        private groupCrud: GroupCrudService,
        private firestore: AngularFirestore,
        private http: HttpClient) { }

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
                    // new
			        Org: e.payload.doc.data()['org'],
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
        this.sender_org = group.Org
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

    buildAddressList(){
        // get the subs from each selected group, and the message from the textbox
        this.all_subs = new Set()
        if (this.selection){
            Object.keys(this.selection).forEach(name => {
                for (let group of this.display_groups){
                    if (name == group.Name){
                        console.log("groupName, groupSubs", name, group.Subs)
                        Object.keys(group.Subs).forEach(uid => {
                            this.all_subs.add(uid);
                        })
                    }
                }
            })
            console.log("all_subs", this.all_subs)
        }

        // form the list of regTokens
        this.deviceCrud.read_Devices().subscribe(data => {
             this.groups = data.map(e => {
                this.regTokenlist = []
                let userID = e.payload.doc.data()['userID']
                let tok = e.payload.doc.data()['token']
                console.log("userID", userID)
                console.log("hello all_subs", this.all_subs)
                console.log("what", this.all_subs.has("k2DRkiUcmZd5XcjyZRZ3kpin2aM2"))
                if (this.all_subs.has(userID)) {
                    console.log("triggee")
                    this.regTokenlist.push(tok)
                }
                return {};
            })
            console.log("regTokenlist", this.regTokenlist)           
        });


        let postdata = {
                "notification_body": this.message,
                "notification_title": this.sender_org,
                "regTokenlist": this.regTokenlist
        }        
        this.http.post(
        'https://us-central1-church-34afa.cloudfunctions.net/helloWorld', postdata)
      .subscribe((data: any) => {
        console.log(data);
        // this.firebaseReply = data.text;
      });
    }


    




    // remove the group from the groups db
	deleteGroup(group) {
	  	this.groupCrud.delete_Group(group.id)
	}
}



