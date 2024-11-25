import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asistenciageneral',
  templateUrl: './asistenciageneral.page.html',
  styleUrls: ['./asistenciageneral.page.scss'],
})
export class AsistenciageneralPage implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params); // { key1: 'value1', key2: 'value2' }
    });
  }
  goBack() {
    window.history.back(); // Navega a la página anterior usando el historial del navegador
  }
}
