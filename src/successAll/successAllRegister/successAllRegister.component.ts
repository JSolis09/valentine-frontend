import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SubastaService } from '../../app/services';
import { SubastaModel } from '../../app/models/subasta.model';
import { EstadoSubastaConstants } from '../../app/shared/constants/estadoSubasta.constants';
@Component({
    selector: 'app-successAllRegister',
    templateUrl: './successAllRegister.component.html',
    styleUrls: ['./successAllRegister.component.css'],
})

export class SuccessAllRegisterComponent {
    
    id: number;

    constructor(
        private subastaService: SubastaService,
        private route: ActivatedRoute
    ) {
        let subastaModel: SubastaModel = new SubastaModel();
        
        this.route.params.subscribe(params => {
            const id = params.Id;
            if (id) {
                this.id = id;
                subastaModel.codigoSolCredito = id;
                subastaModel.estado = EstadoSubastaConstants.RECAUDACIONENPROCESO;
                this.subastaService.addSubasta(subastaModel).subscribe();
            }
        });
    }
}
