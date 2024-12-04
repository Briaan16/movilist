import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';  // Asegúrate de importar el UserService

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isTeacher: boolean = false;  // Inicializa como false (por defecto alumno)

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // Escucha cambios en el rol del usuario
    this.userService.role$.subscribe((role) => {
      console.log('Rol actualizado desde el UserService:', role);
      if (role === 'profesor') {
        this.isTeacher = true;
      } else if (role === 'alumno') {
        this.isTeacher = false;
      } else {
        console.log('No se encontró rol, redirigiendo al login...');
        this.router.navigate(['/login']);
      }
    });

    // Verifica el rol inicial
    this.checkUserRole();
  }

  async checkUserRole() {
    const role = await this.userService.getRole(); // Obtén el rol desde el almacenamiento
    console.log('Rol recuperado:', role);  // Verifica el valor del rol
    // Esto es solo por si la suscripción no cubre alguna condición inicial
    if (role === 'profesor') {
      this.isTeacher = true;
    } else if (role === 'alumno') {
      this.isTeacher = false;
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.userService.clearRole(); // Limpiar el rol
    this.router.navigate(['/login']); // Redirige al login
  }
}
