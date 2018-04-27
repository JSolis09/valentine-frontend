import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RegisterSecondStepModel, ParametroModel, UbigeoModel, LocalStorageModel, ClipsRequestModel, PersonValidationRequestModel, ClipsServiceResponseModel } from '../../app/models';
import { ParametroService, SolicitudCreditoService, UbigeoService, LocalStoreManager, ClipsService } from '../../app/services';
import { FormStatusConstants, ParametroConstants, EtapasSolicitudCreditoConstants, EstadoSolicitudCreditoConstants } from '../../app/shared/constants';

@Component({
    selector: 'app-registerSecondStep-add',
    templateUrl: './registerSecondStep-add.component.html',
    styleUrls: ['./registerSecondStep-add.component.css'],
})

export class RegisterSecondStepAddComponent implements OnInit, OnDestroy {
    paisCombo: UbigeoModel[] = [];
    departamentoCombo: UbigeoModel[] = [];
    provinciaCombo: UbigeoModel[] = [];
    distritoCombo: UbigeoModel[] = [];
    estadoCivilCombo: ParametroModel[] = [];
    tipoDocumentoCombo: ParametroModel[] = [];
    rubroActividadtipoDocumentoCombo: ParametroModel[] = [];
    tipoActividadCombo: ParametroModel[] = [];
    rubroActividadCombo: ParametroModel[] = [];
    tipoCuentaCombo: ParametroModel[] = [];
    nombreBancoCombo: ParametroModel[] = [];
    seguroCombo: ParametroModel[] = [];
    registerSecondStepModel: RegisterSecondStepModel = new RegisterSecondStepModel();
    id: number;
    casado: boolean = false;

    registerSecondStepForm = new FormGroup({
        direccionSolicitante: new FormControl(null, [Validators.required]),
        //codigoPostalSolicitante: new FormControl(null, [Validators.required]),
        pais: new FormControl(null, [Validators.required]),
        departamento: new FormControl(null, [Validators.required]),
        provincia: new FormControl(null, [Validators.required]),
        distrito: new FormControl(null, [Validators.required]),
        montoSolicitado: new FormControl(null, [Validators.required]),
        plazoPrestamo: new FormControl(null, [Validators.required]),
        seguroDesgravamen: new FormControl(null, [Validators.required]),
        estadoCivil: new FormControl(null, [Validators.required]),
        detalleMotivo: new FormControl(null, [Validators.required]),
        apellidoPaternoConyuge: new FormControl(),
        apellidoMaternoConyuge: new FormControl(),
        nombresConyuge: new FormControl(),
        tipoDocumentoConyuge: new FormControl(),
        numeroDocConyuge: new FormControl(),
        tipoActividad: new FormControl(null, [Validators.required]),
        rubroActividad: new FormControl(null, [Validators.required]),
        lugarTrabajo: new FormControl(null, [Validators.required]),
        tipoCuenta: new FormControl(null, [Validators.required]),
        banco: new FormControl(null, [Validators.required]),
        cuentaInterbancaria: new FormControl(null, [Validators.required]),
        esPEP: new FormControl(),
        cargoPEP: new FormControl(),
    });

    constructor(
        private clipsService: ClipsService,
        private parametroService: ParametroService,
        private solicitudCreditoService: SolicitudCreditoService,
        private route: ActivatedRoute,
        private router: Router,
        private ubigeoService: UbigeoService,
        private storageManager: LocalStoreManager,
    ) {

        this.route.params.subscribe(params => {
            const id = params.Id;
            if (id) {
                this.id = id;
            }
        });

        this.ubigeoService.getByPadreID(0).subscribe(
            (result: UbigeoModel[]) => {
                this.paisCombo = result;
            },
            error => console.error(error));

        this.parametroService.getByPadreID(ParametroConstants.ESTADOCIVIL).subscribe(
            (result: ParametroModel[]) => {
                this.estadoCivilCombo = result;
            },
            error => console.error(error));

        this.parametroService.getByPadreID(ParametroConstants.TIPODOCUMENTO).subscribe(
            (result: ParametroModel[]) => {
                this.tipoDocumentoCombo = result;
            },
            error => console.error(error));

        this.parametroService.getByPadreID(ParametroConstants.TIPOACTIVIDAD).subscribe(
            (result: ParametroModel[]) => {
                this.tipoActividadCombo = result;
            },
            error => console.error(error));

        this.parametroService.getByPadreID(ParametroConstants.RUBROACTIVIDAD).subscribe(
            (result: ParametroModel[]) => {
                this.rubroActividadCombo = result;
            },
            error => console.error(error));

        this.parametroService.getByPadreID(ParametroConstants.TIPOCUENTA).subscribe(
            (result: ParametroModel[]) => {
                this.tipoCuentaCombo = result;
            },
            error => console.error(error));

        this.parametroService.getByPadreID(ParametroConstants.BANCOS).subscribe(
            (result: ParametroModel[]) => {
                this.nombreBancoCombo = result;
            },
            error => console.error(error));

        this.parametroService.getByPadreID(ParametroConstants.SEGURO).subscribe(
            (result: ParametroModel[]) => {
                this.seguroCombo = result;
            },
            error => console.error(error));
    }

    ngOnInit(): void {
        let ctrl = this.registerSecondStepForm.get('cargoPEP');
        ctrl.disable();
    }

    ngOnDestroy(): void {
        // any
    }

    paisChange(id: any): void {
        this.ubigeoService.getByPadreID(id).subscribe(
            (result: UbigeoModel[]) => {
                this.departamentoCombo = result;
            },
            error => console.error(error));
    }

    departamentoChange(id: number): void {
        this.ubigeoService.getByPadreID(id).subscribe(
            (result: UbigeoModel[]) => {
                this.provinciaCombo = result;
            },
            error => console.error(error));
    }

    estadoCivilChange(id: any): void {
        if (id === '1: 18') {
            this.casado = true;
        }
        else {
            this.casado = false;
        }
    }

    provinciaChange(id: number): void {
        this.ubigeoService.getByPadreID(id).subscribe(
            (result: UbigeoModel[]) => {
                this.distritoCombo = result;
            },
            error => console.error(error));
    }

    registerSecondStep(): void {

        if (!this.registerSecondStepForm.value.direccionSolicitante ||
            //!this.registerSecondStepForm.value.codigoPostalSolicitante ||
            !this.registerSecondStepForm.value.pais ||
            !this.registerSecondStepForm.value.departamento ||
            !this.registerSecondStepForm.value.provincia ||
            !this.registerSecondStepForm.value.distrito ||
            !this.registerSecondStepForm.value.montoSolicitado ||
            !this.registerSecondStepForm.value.plazoPrestamo ||
            !this.registerSecondStepForm.value.seguroDesgravamen ||
            !this.registerSecondStepForm.value.estadoCivil ||
            !this.registerSecondStepForm.value.detalleMotivo ||
            !this.registerSecondStepForm.value.tipoActividad ||
            !this.registerSecondStepForm.value.rubroActividad ||
            !this.registerSecondStepForm.value.lugarTrabajo ||
            !this.registerSecondStepForm.value.tipoCuenta ||
            !this.registerSecondStepForm.value.banco ||
            !this.registerSecondStepForm.value.cuentaInterbancaria) {
            alert('Para continuar con la tercera fase debe ingresar la información solicitada. No podemos continuar si el formulario presenta datos faltantes o errados.');
            return;
        }


        var montoSolicitado = this.registerSecondStepForm.value.montoSolicitado;
        if (montoSolicitado < 2000 || montoSolicitado > 30000) {
            alert('El monto solicitado está fuera del rango permitido (Mayor a S/. 2,000.00 y menor a S/. 30,000.00)');
            return;
        }

        if (this.casado) {
            let apellidoPaternoConyuge = this.registerSecondStepForm.get('apellidoPaternoConyuge');
            let apellidoMaternoConyuge = this.registerSecondStepForm.get('apellidoMaternoConyuge');
            let nombresConyuge = this.registerSecondStepForm.get('nombresConyuge');
            let tipoDocumentoConyuge = this.registerSecondStepForm.get('tipoDocumentoConyuge');
            let numeroDocConyuge = this.registerSecondStepForm.get('numeroDocConyuge');
            if (apellidoPaternoConyuge.value == null || apellidoMaternoConyuge.value == null || nombresConyuge.value == null || tipoDocumentoConyuge.value == null || numeroDocConyuge.value == null) {
                alert('Complete los datos de su cónyugue.');
                return;
            }
        }

        if (this.registerSecondStepForm.value.esPEP) {
            if (!this.registerSecondStepForm.value.cargoPEP) {
                alert('Complete la posición de ocupa como PEP.');
                return;
            }
        }

        if (this.casado) {
            var clipsRequestModel: ClipsRequestModel = new ClipsRequestModel();
            clipsRequestModel.NumeroDni = this.registerSecondStepForm.value.numeroDocConyuge;
            clipsRequestModel.DigitoVerificacion = '';
            clipsRequestModel.ApellidoPaterno = this.registerSecondStepForm.value.apellidoPaternoConyuge;
            clipsRequestModel.ApellidoMaterno = this.registerSecondStepForm.value.apellidoMaternoConyuge;
            clipsRequestModel.Nombres = this.registerSecondStepForm.value.nombresConyuge;
            clipsRequestModel.Parentesco = 'C'; // Representa al conyuge
            this.clipsService.getResultEvaluation(clipsRequestModel).subscribe(
                (result: ClipsServiceResponseModel) => {
                    if (result.Resultado === 'rechazado') {
                        this.storageManager.deleteData(); // Borra informacion del cookie
                        this.router.navigate([`/notSuccessClips/${this.id}`]);
                    } else {
                        this.registerSecondStepModel.setAll(this.registerSecondStepForm.value);
                        this.registerSecondStepModel.estado = EstadoSolicitudCreditoConstants.REGISTROENPROCESO;
                        this.registerSecondStepModel.etapa = EtapasSolicitudCreditoConstants.REGISTRO;
                        this.solicitudCreditoService.registerSecondStep(this.id, this.registerSecondStepModel).subscribe(
                            (registerSecondStepModelResult: RegisterSecondStepModel) => {
                                var localStorageModel: LocalStorageModel = new LocalStorageModel();
                                localStorageModel.solicitudCreditoId = this.id;
                                localStorageModel.step = 3;
                                this.storageManager.savePermanentData(localStorageModel, LocalStoreManager.DBKEY_USER_DATA);
                                this.router.navigate([`/successClips/${this.id}`]);
                            }, error => console.error(error)
                        );
                    }
                },
                error => console.error(error),
            );
        }
        else {
            this.registerSecondStepModel.setAll(this.registerSecondStepForm.value);
            this.registerSecondStepModel.estado = EstadoSolicitudCreditoConstants.REGISTROENPROCESO;
            this.registerSecondStepModel.etapa = EtapasSolicitudCreditoConstants.REGISTRO;
            this.solicitudCreditoService.registerSecondStep(this.id, this.registerSecondStepModel).subscribe(
                (registerSecondStepModelResult: RegisterSecondStepModel) => {
                    var localStorageModel: LocalStorageModel = new LocalStorageModel();
                    localStorageModel.solicitudCreditoId = this.id;
                    localStorageModel.step = 3;
                    this.storageManager.savePermanentData(localStorageModel, LocalStoreManager.DBKEY_USER_DATA);
                    this.router.navigate([`/successClips/${this.id}`]);
                }, error => console.error(error)
            );
        }
    }

    onCheckedPEP(event: any) {
        let ctrl = this.registerSecondStepForm.get('cargoPEP');
        ctrl.setValue('');
        if (this.registerSecondStepForm.value.esPEP) {
            ctrl.setValidators(Validators.required);
            ctrl.enable();
        }
        else {
            ctrl.disable();
        }
    }

    _keyPressNumber(event: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    _keyPressText(event: any) {
        const pattern = /[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}
