import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/services/dataservice.service';
import {Categorias, Categoria} from 'src/app/interfaces/horafecha'

@Component({
  selector: 'app-listo',
  templateUrl: './listo.page.html',
  styleUrls: ['./listo.page.scss'],
})
export class ListoPage implements OnInit {

  listaCategorias:Categoria[]=[];


  constructor(private dataService: DataserviceService) { }

  ngOnInit() {
    console.log("On Init");
    this.dataService.getCategorias().subscribe(datos =>{
      console.log(datos);
      this.listaCategorias.push(...datos.categories);
      console.log("MI LISTA (HORARIO/FECHA)");
      console.log(this.listaCategorias);
    })
  }

}
