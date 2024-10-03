import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { Hora} from 'src/app/interfaces/horafecha'

@Component({
  selector: 'app-listo',
  templateUrl: './listo.page.html',
  styleUrls: ['./listo.page.scss'],
})
export class ListoPage implements OnInit {

  horas:Hora[]=[];


  constructor(private dataService: DataserviceService) { }

  ngOnInit() {
    console.log("On Init");
    this.dataService.getHora().subscribe(datos =>{
      console.log(datos);
      console.log("MI (HORARIO/FECHA)");
      console.log(this.horas);
    })
  }

}
