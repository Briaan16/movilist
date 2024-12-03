import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario-log';
import { LocaldbService } from '../../services/localdb.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usr: Usuario = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    correo: '',
  };

  constructor(
    private db: LocaldbService,
    private router: Router,
    private toastController: ToastController,
    private userService: UserService
  ) {}

  ngOnInit() {}

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      color: 'danger',
      header: '¡Error!',
      cssClass: 'texttoast',
    });
    await toast.present();
  }

  async logear() {
    // Verificamos si el usuario ya está registrado
    this.db.obtener(this.usr.correo).then(async (datos) => {
      if (datos) {
        // Validar si las credenciales coinciden
        if (datos.password === this.usr.password) {
          const emailDomain = this.getEmailDomain(this.usr.correo);

          // Establecer el perfil de usuario y rol según el dominio del correo
          const usuario = {
            nombre: datos.nombre,
            apellido: datos.apellido,
            correo: datos.correo,
            rol: emailDomain === 'duocuc.cl' ? 'alumno' : 'profesor',
          };

          // Guardar el perfil del usuario en la base de datos local
          this.db.guardarPerfil(usuario);

          // Establecer el rol en el UserService
          this.userService.setRole(usuario.rol);

          // Redirigir al usuario según su rol
          if (usuario.rol === 'alumno') {
            this.router.navigate(['/asistencia']); // Redirigir a la página de asistencia si es alumno
          } else if (usuario.rol === 'profesor') {
            this.router.navigate(['/asignaturas']); // Redirigir a la página de asignaturas si es profesor
          }
        } else {
          // Mostrar un mensaje si la contraseña es incorrecta
          this.presentToast('top', 'Contraseña incorrecta');
        }
      } else {
        // Mostrar un mensaje si el usuario no se encuentra registrado
        this.presentToast('top', 'Usuario no encontrado');
      }
    });
  }

  // Función para extraer el dominio del correo electrónico
  getEmailDomain(email: string): string {
    return email.substring(email.lastIndexOf('@') + 1);
  }

  goBack() {
    window.history.back(); // Navega a la página anterior usando el historial del navegador
  }
}
