import { Component, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { Alumnos } from 'src/app/interfaces/alumnos';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-formulario-alumno',
  templateUrl: './modal-formulario-alumno.component.html',
  styleUrls: ['./modal-formulario-alumno.component.scss'],
})
export class ModalFormularioAlumnoComponent implements OnInit {
  alumno: Alumnos = {
    nombre: '',
    presente: 0,
    ausente: 0,
    totalClases: 20, // Valor por defecto de 20 clases
  };

  constructor(
    private alumnosService: AlumnosService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  // Guardar el alumno y cerrar el modal
  saveAlumno() {
    if (this.alumno.nombre && this.alumno.presente !== null && this.alumno.ausente !== null && this.alumno.totalClases !== null) {
      this.alumnosService.addAlumno(this.alumno).then(() => {
        this.dismissModal(); // Cerrar el modal una vez guardado
      });
    } else {
      alert("Por favor complete todos los campos.");
    }
  }

  // Cerrar el modal sin guardar
  dismissModal() {
    this.modalController.dismiss();
  }
}
