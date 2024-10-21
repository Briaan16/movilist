import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario-log';
import { LocaldbService } from '../../services/localdb.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usr:Usuario={
    username:'',
    password:'',
    nombre:'',
    apellido:'',
    correo:'',
  }
  constructor(private db:LocaldbService, private router:Router, private toastController:ToastController) { }

  ngOnInit() {
  }
  async presentToast(position: 'top' | 'middle' | 'bottom'){
    const toast = await this.toastController.create({
      message: 'Usuario o clave incorrecto',
      duration: 1500,
      position: position,
      color: 'danger',
      header: '¡Error!',
      cssClass: 'texttoast',
    });

    await toast.present();
  }
  logear(){
    let buscado = this.db.obtener(this.usr.username)

    buscado.then(datos => {
      if (datos !== null) {
        //clg(datos.username)
        if(datos.username===this.usr.username && datos.password===this.usr.password){
          this.router.navigate(['/inicio'])
        }
      } else {
        this.presentToast('top');
      }
    })
  }

}
