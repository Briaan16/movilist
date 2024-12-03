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
    await this.checkUserRole(); // Usar la versión async para obtener el rol
  }

  async checkUserRole() {
    const role = await this.userService.getRole(); // Obtener el rol desde Ionic Storage
    console.log('Rol recuperado:', role);  // Verificar el valor del rol

    if (role === 'profesor') {
      this.isTeacher = true; // Si es profesor, mostrar el menú del profesor
    } else if (role === 'alumno') {
      this.isTeacher = false; // Si es alumno, mostrar el menú del alumno
    } else {
      console.log('No se encontró rol, redirigiendo al login...');
      this.router.navigate(['/login']); // Redirigir al login si no hay rol
    }
  }

  // Método para cerrar sesión
  logout() {
    this.userService.clearRole(); // Limpiar el rol del usuario
    this.router.navigate(['/login']); // Redirigir al login
  }
}
