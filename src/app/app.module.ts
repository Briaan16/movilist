import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';

//LIBRERIAS , copiarlo de la app del profe, son dos imports i think i forRoot
import { IonicStorageModule } from '@ionic/storage-angular';

//firebase xd
import { AngularFireModule} from '@angular/fire/compat';
import { FirestoreModule } from '@angular/fire/firestore';  // Importa AngularFirestoreModule
import { environment } from 'src/environments/environment.prod';
import { ReactiveFormsModule } from '@angular/forms';
//modulo components, agregar listar asignaturas xd 
import { ComponentsModule } from './components/components.module'; // Importa el módulo donde se declara

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FirestoreModule,
    ReactiveFormsModule,  // Asegúrate de incluirlo en 'imports'
    ComponentsModule,  // Importa el módulo que contiene AgregarAsignaturaComponent

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
