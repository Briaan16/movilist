import { Component, OnInit } from '@angular/core';
import { Asignaturas } from 'src/app/interfaces/asignaturas';
import { AsignaturasService } from '../../services/asignaturas.service';
import { Router } from '@angular/router';  // Asegúrate de importar Router

@Component({
  selector: 'app-lista-asignatura',
  templateUrl: './lista-asignatura.component.html',
  styleUrls: ['./lista-asignatura.component.scss'],
})
export class ListaAsignaturaComponent implements OnInit {

  asignaturas: Asignaturas[];

  // Inyectamos AsignaturasService y Router
  constructor(
    private AsignaturasService: AsignaturasService,
    private router: Router  // Asegúrate de inyectar el Router
  ) {
    this.asignaturas = [{
      nombre: 'Asignatura ejemplo: Matemáticas',
      descripcion: 'Ejemplo descripción',
      clases: 0,
    }];
  }

  ngOnInit(): void {
    this.AsignaturasService.getAsignatura().subscribe(asignaturas => {
      this.asignaturas = asignaturas;
    });
  }

  async onClickDelete(asignatura: Asignaturas) {
    const response = await this.AsignaturasService.eliminarAsignatura(asignatura);
    console.log(response);
  }

  // Métodos de navegación
  goToAsistenciaGeneral() {
    const data = { nombre:  this.asignaturas}; // Los datos que deseas enviar
    this.router.navigate(['/asistenciageneral'], { state: data });
  }

  goToCodigo(nombre) {
    const data = { nombre:  nombre }; // Los datos que deseas enviar
    this.router.navigate(['/codigo'], { state: data});
  }
}
