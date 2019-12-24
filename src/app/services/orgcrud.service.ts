import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrgCrudService {

  constructor(private firestore: AngularFirestore) { }

  read_Orgs() {
    return this.firestore.collection('orgs').snapshotChanges();
  }
}
