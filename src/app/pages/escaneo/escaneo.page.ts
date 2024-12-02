import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { LocaldbService } from 'src/app/services/localdb.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-escaneo',
  templateUrl: './escaneo.page.html',
  styleUrls: ['./escaneo.page.scss'],
})
export class EscaneoPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(
    private alertController: AlertController,
    private localdbService: LocaldbService // Inyectar el servicio para guardar las asistencias
  ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    // Si el QR tiene contenido
    const qrValue = barcodes[0]?.rawValue;

    if (qrValue) {
      const [asignatura, fechaHora] = qrValue.split(' - '); // Suponiendo que el QR tiene este formato

      const now = new Date();
      const asistencia = {
        fecha: now.toLocaleDateString(), // Fecha actual
        hora: now.toLocaleTimeString(),  // Hora actual
        nombre: 'usuario 1',             // Nombre de usuario (puedes cambiarlo dinámicamente)
        institucion: 'Duoc UC',          // Institución (puedes personalizarlo)
        curso: asignatura,               // Asignatura del QR
      };

      // Guardar la asistencia escaneada en el historial
      await this.localdbService.guardarAsistencia(asistencia);
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Para usar la aplicación autorizar los permisos de cámara',
      buttons: ['OK'],
    });
    await alert.present();
  }

  goBack() {
    window.history.back(); // Navega a la página anterior usando el historial del navegador
  }
}
