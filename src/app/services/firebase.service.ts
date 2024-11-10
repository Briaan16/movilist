import { inject, Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore = inject(AngularFirestore);

  constructor() { }



  //base de datos firebase
  setDocument(path: string, data: any){

  } 
}
