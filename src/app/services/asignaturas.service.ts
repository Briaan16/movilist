import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc} from '@angular/fire/firestore';
import { Asignaturas } from '../interfaces/asignaturas';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  constructor(private firestore: Firestore) { }

  agregarAsignatura(asignatura : Asignaturas){
    const asignaturaRef = collection(this.firestore, 'asignaturas');
    return addDoc(asignaturaRef, asignatura);
  }

  getAsignatura(): Observable<Asignaturas[]>{
    const asignaturaRef = collection(this.firestore, 'asignaturas');
    return collectionData(asignaturaRef, { idField: 'id'}) as Observable<Asignaturas[]>;
  }

  eliminarAsignatura(asignatura: Asignaturas){
    const asignaturaDocRef = doc(this.firestore, 'asignaturas/${asignatura.id}');
    return deleteDoc(asignaturaDocRef); 
  }

}
