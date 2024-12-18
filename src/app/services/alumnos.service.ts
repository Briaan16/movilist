import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData } from '@angular/fire/firestore';
import { Alumnos } from '../interfaces/alumnos';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private firestore: Firestore) { }

  // Modificar addAlumno para incluir totalClases
  addAlumno(alumno: Alumnos) {
    const alumnoRef = collection(this.firestore, 'alumnos');
    return addDoc(alumnoRef, {
      nombre: alumno.nombre,
      presente: alumno.presente,
      ausente: alumno.ausente,
      totalClases: alumno.totalClases || 20  // Usamos 20 como un valor por defecto
    });
  }

  getAlumno(): Observable<Alumnos[]> {
    const alumnoRef = collection(this.firestore, 'alumnos');
    return collectionData(alumnoRef, { idField: 'id' }) as Observable<Alumnos[]>;
  }

  // Eliminar un alumno
  deleteAlumno(alumno: Alumnos) {
    const asignaturaDocRef = doc(this.firestore, `alumnos/${alumno.id}`);
    return deleteDoc(asignaturaDocRef);
  }
}
