import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LocaldbService {
      //sacarlo del github del profe x2xp, de ahi se saca la función de guardar creo
  private _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.init();
   }

   async init(){
    //If using, define drivers here: await this.storage.defineDrive(/*...*/);
    const storage = await this.storage.create();
    this._storage= storage;
   }

   public guardar(key: string, value: any){
    this._storage?.set(key, value);
   }
   
   public async obtener(key: string ){
    const valor = await this._storage?.get(key);
    return valor;
   }
}
