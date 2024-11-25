import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service'; // Asegúrate de importar el UserService

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isTeacher: boolean = false;  // Variable para determinar el rol del usuario

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const role = this.userService.getRole();
    if (role === 'profesor') {
      this.isTeacher = true;
      this.router.navigate(['/asignaturas']); // Redirige a la página del profesor
    } else if (role === 'alumno') {
      this.isTeacher = false;
      this.router.navigate(['/alumno']); // Redirige a la página del alumno
    } else {
      this.router.navigate(['/login']); // Redirige al login si no hay rol
    }
  }

  // Método para cerrar sesión
  logout() {
    this.userService.clearRole(); // Limpiar el rol del usuario
    this.router.navigate(['/login']); // Redirigir al login
  }
}
