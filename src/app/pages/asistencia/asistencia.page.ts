import { Component, OnInit } from '@angular/core';
import { LocaldbService } from 'src/app/services/localdb.service'; // Inyectar el servicio

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  historialAsistencias: { fecha: string; hora: string; nombre: string; institucion: string; curso: string }[] = [];

  constructor(private localdbService: LocaldbService) {}

  async ngOnInit() {
    // Inicializa el historial de asistencias
    await this.localdbService.initializeHistorial();
    // Carga el historial de asistencias desde Ionic Storage
    this.historialAsistencias = await this.localdbService.getHistorialAsistencias();
  }

  goBack() {
    window.history.back(); // Navega a la página anterior usando el historial del navegador
  }
}
