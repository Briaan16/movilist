import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class LocaldbService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Guardar datos en Ionic Storage
  public guardar(key: string, value: any) {
    this._storage?.set(key, value);
  }

  // Obtener datos de Ionic Storage
  public async obtener(key: string) {
    const valor = await this._storage?.get(key);
    return valor;
  }

  // Método para inicializar el historial de asistencias
  initializeHistorial() {
    if (!localStorage.getItem('historialAsistencias')) {
      localStorage.setItem('historialAsistencias', JSON.stringify([])); // Inicializa el historial vacío
    }
  }

  // Método para guardar una nueva asistencia en el historial
  guardarAsistencia(asistencia: { fecha: string; hora: string; nombre: string; institucion: string; curso: string }) {
    const historialAsistencias = this.getHistorialAsistencias(); // Obtiene el historial actual
    historialAsistencias.push(asistencia); // Añade la nueva asistencia
    localStorage.setItem('historialAsistencias', JSON.stringify(historialAsistencias)); // Guarda el nuevo historial en localStorage
  }

  // Método para obtener el historial de asistencias
  getHistorialAsistencias() {
    const historialAsistencias = localStorage.getItem('historialAsistencias');
    return historialAsistencias ? JSON.parse(historialAsistencias) : [];
  }

  // Guardar el perfil del usuario en Ionic Storage
  guardarPerfil(usuario: { nombre: string; apellido: string; correo: string; rol: string }) {
    this.guardar('perfilUsuario', usuario);
  }

  // Obtener el perfil del usuario desde Ionic Storage
  async obtenerPerfil() {
    const perfil = await this.obtener('perfilUsuario');
    return perfil;
  }

  // Eliminar el perfil del usuario de Ionic Storage (cuando cierre sesión)
  eliminarPerfil() {
    this._storage?.remove('perfilUsuario');
  }
}
