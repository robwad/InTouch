import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  constructor(private firestore: AngularFirestore) { }

  create_NewUser(record) {
    return this.firestore.collection('users').add(record);
  }

  read_Users() {
    return this.firestore.collection('users').snapshotChanges();
  }

  // read_User(id) {
  //   return this.firestore.collection('users/' + id).snapshotChanges();
  // }

  update_User(recordID,record){
    this.firestore.doc('users/' + recordID).update(record);
  }

  delete_User(record_id) {
    this.firestore.doc('users/' + record_id).delete();
  }
}

