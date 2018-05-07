import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ArchivoService } from '../../services';
import { SolicitudCreditoRequest } from '../credit-application.model';
import { CreditApplicationService } from '../credit-application.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  public documentId: string;
  public showChildView: boolean;
  public navLinks = [
    { label: 'General', path: 'general' },
    { label: 'Solicitud', path: 'application' },
    { label: 'Evaluación', path: 'evaluation' },
    { label: 'Préstamo', path: 'loan' },
  ];

  constructor(private activatedRoute: ActivatedRoute,
              private archivoService: ArchivoService,
              private creditApplicationService: CreditApplicationService,
              private router: Router) { }

  ngOnInit() {
    this.showChildView = false;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.documentId = params['id'];
      this.creditApplicationService
        .getCreditApplicationByCode(this.documentId)
        .subscribe((response) => {
          this.creditApplicationService.solicitudCredito = response;
          this.showChildView = true;
        });
    });
  }

  save(): void {
    const solicitud = this.creditApplicationService.solicitudCredito;
    const solicitudCredito = new SolicitudCreditoRequest();
    solicitudCredito.CodigoInterbancario = solicitud.CodigoInterbancario;
    solicitudCredito.CodigoPrestamo = solicitud.PrestamoCodigo;
    solicitudCredito.CodigoSolCredito = solicitud.CodigoSolCredito;
    solicitudCredito.CodigoSubasta = solicitud.CodigoSubasta;
    solicitudCredito.DepartamentoSolicitanteId = solicitud.DepartamentoSolicitanteId;
    solicitudCredito.DireccionSolicitante = solicitud.DireccionSolicitante;
    solicitudCredito.DistritoSolicitanteId = solicitud.DistritoSolicitanteId;
    solicitudCredito.EsContratoGuardado  = solicitud.EsContratoCargado || false;
    solicitudCredito.EstadoSolicitudId = solicitud.EstadoSolicitudId;
    solicitudCredito.NombreEntidadId = solicitud.NombreEntidadId;
    solicitudCredito.NumeroCelular = solicitud.NumeroCelular;
    solicitudCredito.PaisSolicitanteId = solicitud.PaisSolicitanteId;
    solicitudCredito.ProvinciaSolicitanteId = solicitud.ProvinciaSolicitanteId;
    solicitudCredito.TipoCuentaId = solicitud.TipoCuentaId;

    console.log(solicitudCredito);
    const uploadFileList = this.creditApplicationService.solicitudCredito.ArchivoContrato || [];
    Observable.forkJoin(this.archivoService.uploadFile(uploadFileList),
                        this.creditApplicationService.saveApplication(solicitudCredito))
      .subscribe((response) => {
        this.router.navigate(['credit-application/overview']);
      });
  }
}
