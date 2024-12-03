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

  // Método para obtener el rol del usuario
  async obtenerRole() {
    return await this._storage?.get('userRole');
  }

  // Guardar el perfil del usuario
  guardarPerfil(usuario: { nombre: string; apellido: string; correo: string; rol: string }) {
    this.guardar('perfilUsuario', usuario);
  }

  // Obtener el perfil del usuario
  async obtenerPerfil() {
    const perfil = await this.obtener('perfilUsuario');
    return perfil;
  }

  // Eliminar el perfil del usuario de Ionic Storage (cuando cierre sesión)
  async eliminarPerfil() {
    await this._storage?.remove('perfilUsuario');
  }

  // Métodos para manejar el historial de asistencias

  // Inicializar el historial de asistencias
  async initializeHistorial() {
    const historialAsistencias = await this._storage?.get('historialAsistencias');
    if (!historialAsistencias) {
      await this._storage?.set('historialAsistencias', []); // Inicializa el historial vacío
    }
  }

  // Obtener el historial de asistencias
  async getHistorialAsistencias() {
    const historialAsistencias = await this._storage?.get('historialAsistencias');
    return historialAsistencias || []; // Si no existe, devuelve un array vacío
  }

  // Guardar una nueva asistencia
  async guardarAsistencia(asistencia: { fecha: string; hora: string; nombre: string; institucion: string; curso: string }) {
    const historialAsistencias = await this.getHistorialAsistencias(); // Obtiene el historial actual
    historialAsistencias.push(asistencia); // Añade la nueva asistencia
    await this._storage?.set('historialAsistencias', historialAsistencias); // Guarda el nuevo historial
  }
}
