import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SolicitudCreditoService } from '../../app/services';

@Component({
    selector: 'app-notSuccess',
    templateUrl: './notSuccess.component.html',
    styleUrls: ['./notSuccess.component.css'],
})

export class NotSuccessComponent {

    id: number;

    constructor(
        private solicitudCreditoService: SolicitudCreditoService,
        private route: ActivatedRoute
    ) {

        this.route.params.subscribe(params => {
            const id = params.Id;
            if (id) {
                this.id = id;
                this.solicitudCreditoService.rechazarSolicitud(id).subscribe();
            }
        });
    }
}
