import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario-log';
import { LocaldbService } from 'src/app/services/localdb.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usr:Usuario={
    username:'',
    password:'',
    nombre:'',
    apellido:'',
    correo:'',
  }

  constructor(private db:LocaldbService) { }

  ngOnInit() {
  }

  registrar(){
    let buscado=this.db.obtener(this.usr.username)
    console.log(buscado);
    buscado.then(datos=>{
      console.log(datos);
      if (datos===null){
        this.db.guardar(this.usr.username, this.usr);
      }else{
        return;


      }
    });
  }
}
