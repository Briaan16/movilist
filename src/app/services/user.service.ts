import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';  // Importa BehaviorSubject
import { LocaldbService } from './localdb.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private roleSubject = new BehaviorSubject<string | null>(null);  // Inicializa con un valor null
  role$ = this.roleSubject.asObservable();  // Exponemos el rol como observable

  constructor(private localdbService: LocaldbService) {}

  // Obtener el rol del usuario desde Ionic Storage
  async getRole(): Promise<string | null> {
    const role = await this.localdbService.obtener('userRole');
    this.roleSubject.next(role);  // Actualiza el rol en el BehaviorSubject
    return role;
  }

  // Establecer el rol del usuario en Ionic Storage
  setRole(role: string): void {
    console.log('Estableciendo rol:', role);
    this.localdbService.guardar('userRole', role);
    this.roleSubject.next(role);  // Actualiza el rol inmediatamente
  }

  // Limpiar el rol del usuario de Ionic Storage
  clearRole(): void {
    console.log('Limpiando el rol del usuario');
    this.localdbService.eliminarPerfil(); // Limpiar el perfil si es necesario
    this.roleSubject.next(null);  // El rol es limpiado
  }

  // Actualizar el estado del rol
  updateRoleState() {
    const role = this.roleSubject.getValue();  // Obtiene el valor actual del rol
    this.roleSubject.next(role);  // Vuelve a emitir el valor para que cualquier suscriptor se actualice
  }
}
