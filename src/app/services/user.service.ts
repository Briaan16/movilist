import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() {}

  // Obtener el rol del usuario desde localStorage
  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Establecer el rol del usuario en localStorage
  setRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  // Limpiar el rol del usuario de localStorage
  clearRole(): void {
    localStorage.removeItem('userRole');
  }
}
