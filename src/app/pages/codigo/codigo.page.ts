import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.page.html',
  styleUrls: ['./codigo.page.scss'],
})
export class CodigoPage implements OnInit {

  segment = 'generate';
  qrText = 'test123';

  constructor() { }

  ngOnInit() {
  }

}
