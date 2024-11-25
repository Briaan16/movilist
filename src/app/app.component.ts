import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service'; // Importar el UserService

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isTeacher: boolean = false;  // Variable para determinar el rol del usuario

  constructor(private userService: UserService, private router: Router) {}

  async ngOnInit() {
    await this.checkUserRole(); // Usar la versión async
  }

  async checkUserRole() {
    const role = await this.userService.getRole(); // Obtener el rol desde Ionic Storage
    console.log('Rol recuperado:', role); // Verificar el valor del rol

    if (role === 'profesor') {
      this.isTeacher = true;
      console.log('Rol es profesor. Redirigiendo a asignaturas...');
      setTimeout(() => this.router.navigate(['/asignaturas']), 100); // Redirigir a asignaturas si es profesor
    } else if (role === 'alumno') {
      this.isTeacher = false;
      console.log('Rol es alumno. Redirigiendo a asistencia...');
      setTimeout(() => this.router.navigate(['/asistencia']), 100); // Redirigir a la página del alumno
    } else {
      console.log('No se encontró rol, redirigiendo al login...');
      setTimeout(() => this.router.navigate(['/login']), 100); // Redirigir al login si no hay rol
    }
  }

  // Método para cerrar sesión
  logout() {
    this.userService.clearRole(); // Limpiar el rol del usuario
    this.router.navigate(['/login']); // Redirigir al login
  }
}
