import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LocaldbService } from 'src/app/services/localdb.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  historialAsistencias: { fecha: string, hora: string, nombre: string, institucion: string, curso: string }[] = [];
  nombreUsuario: string = ''; // Nueva propiedad para almacenar el nombre del usuario

  constructor(private navCtrl: NavController, private localdbService: LocaldbService) { }

  ngOnInit() {
    // Inicializa el historial de asistencias si es necesario
    this.localdbService.initializeHistorial();

    // Carga el historial de asistencias desde localStorage
    this.historialAsistencias = this.localdbService.getHistorialAsistencias();

  }
  asistenciasPorAsignatura = [
    {
      nombre: 'Programación de Aplicaciones Móviles',
      registros: [
        { fecha: '2024-08-14', estado: 'Presente' },
        { fecha: '2024-08-22', estado: 'Justificado' }
      ]
    },
    {
      nombre: 'Introduccion al Narco',
      registros: [
        { fecha: '2024-09-01', estado: 'Presente' },
        { fecha: '2024-09-02', estado: 'Ausente' }
      ]
    },
    {
      nombre: 'Arquitectura de planos',
      registros: [
        { fecha: '2024-09-20', estado: 'Presente' }
      ]
    },
    {
      nombre: 'La calle y su actuar',
      registros: [
        { fecha: '2024-09-22', estado: 'Presente' }
      ]
    },
    {
      nombre: 'Arduino',
      registros: [
        { fecha: '2024-09-24', estado: 'Presente' }
      ]
    }
  ];

  goBack() {
    window.history.back(); // Navega a la página anterior usando el historial del navegador
  }

}
