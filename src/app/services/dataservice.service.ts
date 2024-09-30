import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorias } from '../interfaces/horafecha';

@Injectable({
  providedIn: 'root'
})

// github del profe
export class DataserviceService {

  constructor(private httpclient:HttpClient) { }

  getCategorias(){
    return this.httpclient.get<Categorias>('http://worldtimeapi.org/api/timezone/America/Santiago');
}
}
