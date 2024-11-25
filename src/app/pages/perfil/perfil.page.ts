import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LocaldbService } from '../../services/localdb.service'; // Importar el servicio

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any = {};  // Aquí guardamos los datos del usuario

  constructor(
    private router: Router,
    private userService: UserService,
    private db: LocaldbService // Usamos el servicio para acceder a la base de datos local
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  // Cargar los datos del usuario desde Ionic Storage
  async loadUserProfile() {
    const perfil = await this.db.obtenerPerfil();
    if (perfil) {
      this.usuario = perfil;
    }
  }

  // Función para cerrar sesión
  logout() {
    this.userService.clearRole(); // Limpiar el rol
    this.db.eliminarPerfil(); // Eliminar el perfil guardado
    this.router.navigate(['/login']); // Redirigir al login
  }

  // Función para regresar a la página anterior
  goBack() {
    window.history.back();
  }
}
