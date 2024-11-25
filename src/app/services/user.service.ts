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
    this.localdbService.guardar('userRole', role);
  }

  // Limpiar el rol del usuario de Ionic Storage
  clearRole(): void {
    this.localdbService.eliminarPerfil(); // Limpiar el perfil, o crear un método 'clearRole' en LocaldbService
  }
}
