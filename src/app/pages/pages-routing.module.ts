import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'codigo',
    loadChildren: () => import('./codigo/codigo.module').then( m => m.CodigoPageModule)
  },
  {
    path: 'escaneo',
    loadChildren: () => import('./escaneo/escaneo.module').then( m => m.EscaneoPageModule)
  },
  {
    path: 'listo',
    loadChildren: () => import('./listo/listo.module').then( m => m.ListoPageModule)
  },
  
  {
    path: 'configu',
    loadChildren: () => import('./configu/configu.module').then( m => m.ConfiguPageModule)
  },  {
    path: 'docente',
    loadChildren: () => import('./docente/docente.module').then( m => m.DocentePageModule)
  },
  {
    path: 'alumno',
    loadChildren: () => import('./alumno/alumno.module').then( m => m.AlumnoPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
