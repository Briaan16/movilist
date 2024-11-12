import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { ModalController, ModalOptions } from '@ionic/angular';  // Importamos ModalController
import { Asignaturas } from '../interfaces/asignaturas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  constructor(private firestore: Firestore, private modalCtrl: ModalController) { }

  // Funcionalidad de agregar asignaturas
  agregarAsignatura(asignatura: Asignaturas) {
    const asignaturaRef = collection(this.firestore, 'asignaturas');
    return addDoc(asignaturaRef, asignatura);
  }

  // Obtener las asignaturas
  getAsignatura(): Observable<Asignaturas[]> {
    const asignaturaRef = collection(this.firestore, 'asignaturas');
    return collectionData(asignaturaRef, { idField: 'id' }) as Observable<Asignaturas[]>;
  }

  // Eliminar una asignatura
  eliminarAsignatura(asignatura: Asignaturas) {
    const asignaturaDocRef = doc(this.firestore, `asignaturas/${asignatura.id}`);
    return deleteDoc(asignaturaDocRef);
  }

}
