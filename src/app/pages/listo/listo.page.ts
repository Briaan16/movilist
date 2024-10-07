import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { Hora} from 'src/app/interfaces/horafecha'

@Component({
  selector: 'app-listo',
  templateUrl: './listo.page.html',
  styleUrls: ['./listo.page.scss'],
})
export class ListoPage implements OnInit {

  horas:Hora ={
    utc_offset: '',
    timezone: '',
    day_of_week: 0,
    day_of_year: 0,
    datetime: '',
    utc_datetime: '',
    unixtime: 0,
    raw_offset: 0,
    week_number: 0,
    dst: false,
    abbreviation: '',
    dst_offset: 0,
    dst_from: '',
    dst_until: '',
    client_ip: '',
  }

  constructor(private dataService: DataserviceService) { }

  ngOnInit() {
    console.log("On Init");
    this.dataService.getHora().subscribe(datos =>{
      console.log(datos);
      this.horas= datos;
      console.log("MI (HORARIO/FECHA)");
      console.log(this.horas);  
    })
  }

}
