import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { Hora} from 'src/app/interfaces/horafecha'
import { LocaldbService } from 'src/app/services/localdb.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-listo',
  templateUrl: './listo.page.html',
  styleUrls: ['./listo.page.scss'],
})
export class ListoPage {


  
  constructor(private navCtrl: NavController, private localdbService: LocaldbService) { }


  irAHistorial() {
    // Navegar a la página de historial de asistencia
    this.navCtrl.navigateForward('/asistencia');
  }
  
  confirmarAsistencia() {
    const fechaActual = new Date();
    const nuevaAsistencia = {
      fecha: fechaActual.toLocaleDateString(),
      hora: fechaActual.toLocaleTimeString(),
      nombre: 'usuario 1', // Nombre del alumno
      institucion: 'Duoc UC',
      curso: 'Informática'
    };

    // Guarda la asistencia en localStorage
    this.localdbService.guardarAsistencia(nuevaAsistencia);

    // Navega de regreso a la página principal del alumno
    this.navCtrl.navigateRoot('/alumno');
  }

  cancelar() {
    // Regresa a la página principal sin guardar asistencia
    this.navCtrl.back();
  }
  
  goBack() {
    window.history.back(); // Navega a la página anterior usando el historial del navegador
  }
}