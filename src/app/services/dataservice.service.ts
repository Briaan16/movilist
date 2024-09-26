import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// github del profe
export class DataserviceService {

  constructor(private httpclient:HttpClient) { }

  getCategorias(){
    return this.httpclient.get('')
  }
}
