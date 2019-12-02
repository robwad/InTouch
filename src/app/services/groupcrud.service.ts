import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class GroupCrudService {

  constructor(private firestore: AngularFirestore) { }

  create_NewGroup(record) {
    return this.firestore.collection('groups').add(record);
  }

  read_Group() {
    return this.firestore.collection('groups').snapshotChanges();
  }

  update_Group(recordID,record){
    this.firestore.doc('groups/' + recordID).update(record);
  }

  delete_Group(record_id) {
    this.firestore.doc('groups/' + record_id).delete();
  }
}

