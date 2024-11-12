import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  goBack() {
    window.history.back(); // Navega a la página anterior usando el historial del navegador
  }
}
