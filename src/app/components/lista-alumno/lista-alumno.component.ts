import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumnos } from 'src/app/interfaces/alumnos';
import { ModalFormularioAlumnoComponent } from '../modal-formulario-alumno/modal-formulario-alumno.component'; // Importar el componente del modal

@Component({
  selector: 'app-lista-alumno',
  templateUrl: './lista-alumno.component.html',
  styleUrls: ['./lista-alumno.component.scss'],
})
export class ListaAlumnoComponent implements OnInit {
  alumnos: Alumnos[] = [];
  totalClases: number = 20; // Total de clases (puedes ajustarlo según sea necesario)

  constructor(private alumnosService: AlumnosService, private modalController: ModalController) {}

  ngOnInit(): void {
    this.alumnosService.getAlumno().subscribe((alumnos) => {
      this.alumnos = alumnos;
    });
  }

  // Método para calcular el porcentaje de asistencia basado en el total de clases
  calcularPorcentajeAsistencia(alumno: Alumnos): number {
    if (this.totalClases === 0) {
      return 0; // Evitar división por 0
    }
    // Cálculo de porcentaje de asistencia
    const porcentaje = (alumno.presente / this.totalClases) * 100;
    return porcentaje;
  }

  async onClickDelete(alumno: Alumnos) {
    const response = await this.alumnosService.deleteAlumno(alumno);
    console.log(response);
  }

  goBack() {
    window.history.back(); // Navega a la página anterior usando el historial del navegador
  }

  // Método para abrir el modal de agregar alumno
  async openModal() {
    const modal = await this.modalController.create({
      component: ModalFormularioAlumnoComponent, // Componente del modal
    });
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        // Si se recibe un alumno nuevo, lo agregamos a la lista
        this.alumnos.push(result.data);
      }
    });
    return await modal.present();
  }
}
