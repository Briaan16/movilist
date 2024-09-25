import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciageneralPageRoutingModule } from './asistenciageneral-routing.module';

import { AsistenciageneralPage } from './asistenciageneral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciageneralPageRoutingModule
  ],
  declarations: [AsistenciageneralPage]
})
export class AsistenciageneralPageModule {}
