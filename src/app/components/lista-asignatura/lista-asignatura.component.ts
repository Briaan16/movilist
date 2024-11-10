import { Component, OnInit } from '@angular/core';
import { Asignaturas } from 'src/app/interfaces/asignaturas';
import { AsignaturasService } from '../../services/asignaturas.service';

@Component({
  selector: 'app-lista-asignatura',
  templateUrl: './lista-asignatura.component.html',
  styleUrls: ['./lista-asignatura.component.scss'],
})
export class ListaAsignaturaComponent implements OnInit {

  asignaturas: Asignaturas[];

  constructor(private AsignaturasService: AsignaturasService) {

    this.asignaturas = [{
      nombre: 'Asignatura ejemplo: Matemáticas',
      descripcion: 'Ejemplo descripción',
      clases: 0,
    }];

  }

  ngOnInit(): void {
    this.AsignaturasService.getAsignatura().subscribe(asignaturas => {
      this.asignaturas = asignaturas;
      //console.log(asignaturas);
    })
  }

  async onClickDelete(asignatura: Asignaturas) {
    const response = await this.AsignaturasService.eliminarAsignatura(asignatura);
    console.log(response)
  }
}

