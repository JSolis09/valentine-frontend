import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ArchivoService } from '../../services';
import { Parameter, SolicitudCreditoRequest } from '../credit-application.model';
import { CreditApplicationService } from '../credit-application.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  public documentId: string;
  public reason: number = 0;
  public reasonList: Parameter[];
  public showChildView: boolean;
  public showCancelButton: boolean;
  public navLinks = [
    { label: 'General', path: 'general' },
    { label: 'Solicitud', path: 'application' },
    { label: 'Evaluación', path: 'evaluation' },
    { label: 'Préstamo', path: 'loan' },
  ];
  public modalRef: BsModalRef;

  constructor(private activatedRoute: ActivatedRoute,
              private archivoService: ArchivoService,
              private creditApplicationService: CreditApplicationService,
              private modalService: BsModalService,
              private router: Router) { }

  ngOnInit() {
    this.showChildView = false;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.documentId = params['id'];
      this.creditApplicationService
        .getCreditApplicationByCode(this.documentId)
        .subscribe((response) => {
          const solicitud = response;
          this.creditApplicationService.solicitudCredito = solicitud;
          this.showChildView = true;
          this.showCancelButton = solicitud.EstadoSolicitudId === 55 && (solicitud.EstadoSubastaId === 67 ||  solicitud.EstadoSubastaId === 71) ||
                                  solicitud.EstadoSolicitudId === 63 && (solicitud.EstadoSubastaId === 69 ||  solicitud.EstadoSubastaId === 72);
          if (this.showCancelButton) {
            this.creditApplicationService
              .getAllReasons()
              .subscribe((data) => {
                this.reasonList = data;
              });
          }
        });
    });
  }

  cancelProcess(): void {
    const solicitud = this.creditApplicationService.solicitudCredito;
    this.creditApplicationService
      .cancelProcess(solicitud.CodigoSolCredito, this.reason.toString())
      .subscribe(() => { });
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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

    const uploadFileList = this.creditApplicationService.solicitudCredito.ArchivoContrato || [];
    Observable.forkJoin(this.archivoService.uploadFile(uploadFileList),
                        this.creditApplicationService.saveApplication(solicitudCredito))
      .subscribe((response) => {
        this.router.navigate(['credit-application/overview']);
      });
  }

  goSearch(): void {
    this.router
      .navigate(['credit-application/overview']);
  }
}
