import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';  // Importamos la función para formatear la fecha
import html2canvas from 'html2canvas';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.page.html',
  styleUrls: ['./codigo.page.scss'],
})
export class CodigoPage implements OnInit {

  segment = 'generate';
  qrText = ''; // Aquí se almacenará la asignatura + fecha y hora

  constructor(
    private loadingController: LoadingController,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.setAsignaturaYFechaHora();
  }

  // Función para establecer el nombre de la asignatura y concatenarlo con la fecha y hora
  setAsignaturaYFechaHora() {
    const state = window.history.state;
    let asignatura = '';

    // Si el nombre de la asignatura viene desde el estado de la ruta, lo asignamos
    if (state && state.nombre) {
      asignatura = state.nombre;
    } else {
      asignatura = 'Nombre de la asignatura'; // Valor por defecto si no hay asignatura
    }

    // Obtener la fecha y hora actual
    const now = new Date();
    const fechaHora = formatDate(now, 'yyyy-MM-dd HH:mm:ss', 'en-US');

    // Concatenar asignatura y fecha
    this.qrText = `${asignatura} - ${fechaHora}`; // Esto es lo que aparecerá en el QR
  }

  // Función para capturar y compartir la imagen del QR
  captureScreen() {
    const element = document.getElementById('qrImage') as HTMLElement;

    html2canvas(element).then((canvas: HTMLCanvasElement) => {
      if (this.platform.is('capacitor')) this.shareImage(canvas);
      else this.downloadImage(canvas);
    });
  }

  // Función para descargar la imagen del QR
  downloadImage(canvas: HTMLCanvasElement) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = "qr.png";
    link.click();
  }

  // Función para compartir la imagen del QR
  async shareImage(canvas: HTMLCanvasElement) {
    let base64 = canvas.toDataURL();
    let path = "qr.png";

    const loading = await this.loadingController.create({spinner: 'crescent'});
    await loading.present();

    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Cache,
    }).then(async (res) => {
      let uri = res.uri;
      await Share.share({url: uri});
      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache
      });
    }).finally(() => {
      loading.dismiss();
    });
  }

  // Función para regresar a la página anterior
  goBack() {
    window.history.back();
  }
}
