import { Injectable } from '@angular/core';
import { LocaldbService } from './localdb.service'; // Importar el servicio LocaldbService

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private localdbService: LocaldbService) {}

  // Obtener el rol del usuario desde Ionic Storage
  async getRole(): Promise<string | null> {
    return await this.localdbService.obtener('userRole');
  }

  // Establecer el rol del usuario en Ionic Storage
  setRole(role: string): void {
    console.log('Estableciendo rol:', role);  // Para debug
    this.localdbService.guardar('userRole', role);
  }

  // Limpiar el rol del usuario de Ionic Storage
  clearRole(): void {
    console.log('Limpiando el rol del usuario');
    this.localdbService.eliminarPerfil(); // Limpiar el perfil si es necesario
  }
}
