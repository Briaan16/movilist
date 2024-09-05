import { Component, OnInit } from '@angular/core';
import { Menuitem } from '../interfaces/menuitem';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  listaItems:Menuitem[]=[]

  constructor() {}
  ngOnInit()  {
  
  }

}
