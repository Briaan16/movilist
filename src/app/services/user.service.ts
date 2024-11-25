// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRole: string | null = null;

  constructor() {
    // Recuperamos el rol del usuario desde localStorage
    this.userRole = localStorage.getItem('userRole');
  }

  // Método para guardar el rol del usuario
  setRole(role: string) {
    this.userRole = role;
    localStorage.setItem('userRole', role);
  }

  // Método para obtener el rol del usuario
  getRole(): string | null {
    return this.userRole;
  }

  // Método para limpiar el rol (al cerrar sesión)
  clearRole() {
    this.userRole = null;
    localStorage.removeItem('userRole');
  }
}
