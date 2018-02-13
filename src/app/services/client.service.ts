import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Client} from "../models/Client";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ClientService {

  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    // 'clients' is the name of the collection in the Firebase console
    this.clientsCollection = this.afs.collection('clients', ref => {
        return ref.orderBy('lastName', 'asc')
      }
    );
  }

  getClients(): Observable<Client[]> {
    //Get clients with the id
    this.clients = this.clientsCollection.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id;
        return data;
      });
    });

    return this.clients;
  }
}
