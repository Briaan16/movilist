import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  goBack() {
    window.history.back(); // Navega a la página anterior usando el historial del navegador
  }
}
