import { Component, OnInit } from '@angular/core';
import { LocaldbService } from 'src/app/services/localdb.service'; // Inyectar el servicio

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  historialAsistencias: { fecha: string; hora: string; institucion: string; curso: string }[] = [];
  usuario: { nombre: string; apellido: string } | null = null;  // Variable para guardar el perfil del usuario
  porcentajeAsistenciasPorAsignatura: { [key: string]: number } = {};  // Objeto para almacenar el porcentaje de asistencia por asignatura
  totalClasesPorAsignatura: { [key: string]: number } = { // Total de clases previstas por asignatura
    'Matemáticas': 10,  // Ejemplo: 10 clases para Matemáticas
    'Lengua': 12,       // Ejemplo: 12 clases para Lengua
    // Agregar más asignaturas y clases totales aquí según sea necesario
  };

  constructor(private localdbService: LocaldbService) {}

  async ngOnInit() {
    // Inicializa el historial de asistencias
    await this.localdbService.initializeHistorial();
    // Carga el historial de asistencias desde Ionic Storage
    this.historialAsistencias = await this.localdbService.getHistorialAsistencias();
    // Carga el perfil del usuario logueado
    this.usuario = await this.localdbService.obtenerPerfil();
    // Calcular el porcentaje de asistencia por asignatura
    this.calcularPorcentajesDeAsistencia();
  }

  // Método para calcular el porcentaje de asistencia para cada asignatura
  calcularPorcentajesDeAsistencia() {
    // Crear un objeto para almacenar las asistencias por asignatura
    const asistenciasPorAsignatura: { [key: string]: number } = {};

    // Recorrer el historial de asistencias y contar las asistencias por asignatura
    this.historialAsistencias.forEach(asistencia => {
      const asignatura = asistencia.curso;
      if (!asistenciasPorAsignatura[asignatura]) {
        asistenciasPorAsignatura[asignatura] = 0;
      }
      asistenciasPorAsignatura[asignatura]++;
    });

    // Calcular el porcentaje de asistencia para cada asignatura
    for (const asignatura in asistenciasPorAsignatura) {
      const totalClases = this.totalClasesPorAsignatura[asignatura] || 0;
      const asistencias = asistenciasPorAsignatura[asignatura];
      const porcentaje = totalClases > 0 ? (asistencias / totalClases) * 100 : 0;
      this.porcentajeAsistenciasPorAsignatura[asignatura] = porcentaje;
    }
  }

  goBack() {
    window.history.back(); // Navega a la página anterior usando el historial del navegador
  }
}
