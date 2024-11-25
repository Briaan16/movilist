import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isTeacher: boolean = false;  // Bandera para determinar si el usuario es profesor
  isStudent: boolean = false;  // Bandera para determinar si el usuario es alumno

  constructor(private userService: UserService) {}

  ngOnInit() {
    const role = this.userService.getRole(); // Obtener el rol desde el servicio
    if (role === 'profesor') {
      this.isTeacher = true;
    } else if (role === 'alumno') {
      this.isStudent = true;
    }
  }
}
