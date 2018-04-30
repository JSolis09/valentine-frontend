import { Component, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStoreManager, SolicitudCreditoService } from './services';
import { EstadoSolicitudCreditoConstants } from './shared/constants';

@Component({
  selector: 'app-valentine',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public viewContainerRef: ViewContainerRef,
              private storageManager: LocalStoreManager,
              private router: Router,
              private solicitudCreditoService: SolicitudCreditoService) {
    this.viewContainerRef = viewContainerRef;
    storageManager.initialiseStorageSyncListener();
    var data = storageManager.getUserData();
    if (data != null) {
      this.solicitudCreditoService.validarEstado(data.solicitudCreditoId)
        .subscribe((result: number) => {
          if (result == EstadoSolicitudCreditoConstants.REGISTROENPROCESO) {
            switch (data.step) {
              case 2:
                this.router.navigate([`/registerSecondStep/${data.solicitudCreditoId}`]);
                break;
              case 3:
                this.router.navigate([`/successClips/${data.solicitudCreditoId}`]);
                break;
              default:
                this.router.navigate([`/registerFirstStep/${data.solicitudCreditoId}`]);
                break;
            }
          }
          else {
            alert('La solicitud de crédito actual se encuentra rechazada, por favor registre una nueva solicitud de crédito.');
            data = null;
            this.storageManager.deleteData();
            this.router.navigate([`/registerFirstStep`]);
          }
        }, error => console.error(error));
    }
  }
}
