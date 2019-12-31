import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DeviceCrudService {

  constructor(private firestore: AngularFirestore) { }

  create_NewDevice(record) {
    return this.firestore.collection('devices').add(record);
  }

  read_Devices() {
    return this.firestore.collection('devices').snapshotChanges();
  }

  update_Device(recordID,record){
    this.firestore.doc('devices/' + recordID).update(record);
  }

  delete_Device(record_id) {
    this.firestore.doc('devices/' + record_id).delete();
  }
}
