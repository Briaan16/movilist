import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarAsignaturaComponent } from './agregar-asignatura/agregar-asignatura.component';
import { ListaAsignaturaComponent } from './lista-asignatura/lista-asignatura.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  // Importa IonicModule aquí
import { HeaderComponent } from './header/header.component';




@NgModule({
  declarations: [AgregarAsignaturaComponent,ListaAsignaturaComponent,HeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,  // Asegúrate de incluir IonicModule aquí
  ],
  exports: [
    AgregarAsignaturaComponent,ListaAsignaturaComponent
    
  ]
})
export class ComponentsModule { }
