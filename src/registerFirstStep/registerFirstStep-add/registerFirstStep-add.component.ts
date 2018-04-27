import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IMyDpOptions } from 'mydatepicker';
import { ParametroModel, RegisterFirstStepModel, LocalStorageModel, responseValidacionSolicitudExistente, PersonValidationRequestModel, PersonValidationResponseModel, ClipsRequestModel, EnviarMailModel, ClipsServiceResponseModel } from '../../app/models';
import { ClipsService, ParametroService, SolicitudCreditoService, LocalStoreManager } from '../../app/services';
import { FormStatusConstants, ParametroConstants, EstadoSolicitudCreditoConstants, EtapasSolicitudCreditoConstants } from '../../app/shared/constants';

@Component({
    selector: 'app-registerFirstStep-add',
    templateUrl: './registerFirstStep-add.component.html',
    styleUrls: ['./registerFirstStep-add.component.css'],
})

export class RegisterFirstStepAddComponent implements OnInit, OnDestroy {
    tipoDocumentoCombo: ParametroModel[] = [];
    sexoCombo: ParametroModel[] = [];
    gradoInstruccionCombo: ParametroModel[] = [];
    destinoCreditoCombo: ParametroModel[] = [];
    registerFirstStepModel: RegisterFirstStepModel = new RegisterFirstStepModel();
    productId: number;

    registerFirstStepForm = new FormGroup({
        nombreSolicitante: new FormControl(null, [Validators.required]),
        apellidoParternoSolicitante: new FormControl(null, [Validators.required]),
        apellidoMaternoSolicitante: new FormControl(null, [Validators.required]),
        fechaNacimiento: new FormControl(null, [Validators.required]),
        tipoDocumento: new FormControl(null, [Validators.required]),
        numeroDocumento: new FormControl(null, [Validators.required]),
        digitoVerificacion: new FormControl(null, [Validators.required]),
        genero: new FormControl(null, [Validators.required]),
        correoElectronico: new FormControl(null, [Validators.required, Validators.email]),
        numeroCelular: new FormControl(null, [Validators.required]),
        ingresosMensuales: new FormControl(null, [Validators.required]),
        gradoInstruccion: new FormControl(null, [Validators.required]),
        destinoCredito: new FormControl(null, [Validators.required]),
        aceptoTerminos: new FormControl(false, [Validators.required])
    });

    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
    };

    constructor(
        private clipsService: ClipsService,
        private parametroService: ParametroService,
        private solicitudCreditoService: SolicitudCreditoService,
        private route: ActivatedRoute,
        private router: Router,
        private storageManager: LocalStoreManager
    ) {
        this.payloads();
    }

    ngOnInit(): void {
        // any
    }

    ngOnDestroy(): void {
        // any
    }

    payloads() {
        this.parametroService.getByPadreID(ParametroConstants.TIPODOCUMENTO).subscribe(
            (result: ParametroModel[]) => {
                this.tipoDocumentoCombo = result;
            },
            error => console.error(error),
        );

        this.parametroService.getByPadreID(ParametroConstants.SEXO).subscribe(
            (result: ParametroModel[]) => {
                this.sexoCombo = result;
            },
            error => console.error(error),
        );

        this.parametroService.getByPadreID(ParametroConstants.GRADOINSTRUCCION).subscribe(
            (result: ParametroModel[]) => {
                this.gradoInstruccionCombo = result;
            },
            error => console.error(error),
        );

        this.parametroService.getByPadreID(ParametroConstants.DESTINOCREDITO).subscribe(
            (result: ParametroModel[]) => {
                this.destinoCreditoCombo = result;
            },
            error => console.error(error),
        );
    }

    registerFirstStep(): void {
        if (!this.registerFirstStepForm.value.nombreSolicitante ||
            !this.registerFirstStepForm.value.apellidoParternoSolicitante ||
            !this.registerFirstStepForm.value.apellidoMaternoSolicitante ||
            !this.registerFirstStepForm.value.fechaNacimiento ||
            !this.registerFirstStepForm.value.tipoDocumento ||
            !this.registerFirstStepForm.value.numeroDocumento ||
            !this.registerFirstStepForm.value.digitoVerificacion ||
            !this.registerFirstStepForm.value.genero ||
            !this.registerFirstStepForm.value.correoElectronico ||
            !this.registerFirstStepForm.value.numeroCelular ||
            !this.registerFirstStepForm.value.ingresosMensuales ||
            !this.registerFirstStepForm.value.gradoInstruccion ||
            !this.registerFirstStepForm.value.destinoCredito) {
            alert('Para continuar con la segunda fase debe ingresar la información solicitada. No podemos continuar si el formulario presenta datos faltantes o errados.');
            return;
        }

        if (String(this.registerFirstStepForm.value.correoElectronico).search('@') == -1) {
            alert('Ingrese un email correcto.');
            return;
        }

        if (!this.registerFirstStepForm.value.aceptoTerminos) {
            alert('Lea y acepte los términos y condiciones');
            return;
        }

        var personValidationRequestModel: PersonValidationRequestModel = new PersonValidationRequestModel();
        personValidationRequestModel.Nombres = this.registerFirstStepForm.value.nombreSolicitante;
        personValidationRequestModel.ApellidoPaterno = this.registerFirstStepForm.value.apellidoParternoSolicitante;
        personValidationRequestModel.ApellidoMaterno = this.registerFirstStepForm.value.apellidoMaternoSolicitante;
        personValidationRequestModel.NumeroDni = this.registerFirstStepForm.value.numeroDocumento;
        personValidationRequestModel.DigitoVerificacion = this.registerFirstStepForm.value.digitoVerificacion;

        this.solicitudCreditoService.validarDatos(personValidationRequestModel)
            .subscribe((response: PersonValidationResponseModel) => {
                if (response) {
                    var nombre: string;
                    if (personValidationRequestModel.Nombres.search(' ') == -1) {
                        nombre = personValidationRequestModel.Nombres;
                    }
                    else {
                        nombre = personValidationRequestModel.Nombres.substring(0, personValidationRequestModel.Nombres.indexOf(' '));
                    }
                    if (nombre != String(response.PrimerNombre).trim() ||
                        personValidationRequestModel.ApellidoPaterno != response.ApellidoPaterno ||
                        personValidationRequestModel.ApellidoMaterno != response.ApellidoMaterno) {
                        alert('Algún dato personal ingresado no es válido. Revise su número de DNI, nombres, apellidos y actualícelos donde encuentre una inconsistencia. Luego continúe con su registro.');
                    }
                    else {
                        this.registerFirstStepForm.patchValue({
                            nombreSolicitante: response.PrimerNombre || ' ' || response.SegundoNombre
                        });
                        var enviarMailModel: EnviarMailModel = new EnviarMailModel();
                        this.solicitudCreditoService.validarSolicitudExistente(this.registerFirstStepForm.value.numeroDocumento)
                            .subscribe((result) => {
                                enviarMailModel.Email = this.registerFirstStepForm.value.correoElectronico;
                                if (result.Respuesta === '1') {
                                    enviarMailModel.EmailType = 1;
                                    this.solicitudCreditoService.enviarMail(enviarMailModel).subscribe();
                                    this.router.navigate(['/notSuccessClips']);
                                    return;
                                }
                                else if (result.Respuesta === '2') {
                                    enviarMailModel.EmailType = 2;
                                    this.solicitudCreditoService.enviarMail(enviarMailModel).subscribe();
                                    this.router.navigate(['/notSuccessClips']);
                                    return;
                                }
                                else if (result.Respuesta === '3') {
                                    enviarMailModel.EmailType = 3;
                                    this.solicitudCreditoService.enviarMail(enviarMailModel).subscribe();
                                    this.router.navigate(['/notSuccessClips']);
                                    return;
                                }
                                else {
                                    var clipsRequestModel: ClipsRequestModel = new ClipsRequestModel();
                                    clipsRequestModel.NumeroDni = personValidationRequestModel.NumeroDni;
                                    clipsRequestModel.DigitoVerificacion = personValidationRequestModel.DigitoVerificacion;
                                    clipsRequestModel.ApellidoPaterno = personValidationRequestModel.ApellidoPaterno;
                                    clipsRequestModel.ApellidoMaterno = personValidationRequestModel.ApellidoMaterno;
                                    clipsRequestModel.Nombres = personValidationRequestModel.Nombres;
                                    clipsRequestModel.Parentesco = 'T';
                                    this.clipsService.getResultEvaluation(clipsRequestModel).subscribe(
                                        (result: ClipsServiceResponseModel) => {
                                            if (result.Resultado === 'rechazada') {
                                                enviarMailModel.EmailType = 4;
                                                this.solicitudCreditoService.enviarMail(enviarMailModel).subscribe();
                                                this.router.navigate(['/notSuccessClips']);
                                            } else {
                                                this.registerFirstStepModel.setAll(this.registerFirstStepForm.value);
                                                this.registerFirstStepModel.fechaNacimiento = this.registerFirstStepForm.value.fechaNacimiento.formatted;
                                                this.registerFirstStepModel.estado = EstadoSolicitudCreditoConstants.REGISTROENPROCESO;
                                                this.registerFirstStepModel.etapa = EtapasSolicitudCreditoConstants.REGISTRO;
                                                this.registerFirstStepModel.fechaRegistro = new Date();
                                                this.registerFirstStepModel.puntuacionBuro = result.PuntuacionBuro;
                                                this.solicitudCreditoService.registerFirstStep(this.registerFirstStepModel).subscribe(
                                                    (registerFirstStepModelResult: RegisterFirstStepModel) => {
                                                        var localStorageModel: LocalStorageModel = new LocalStorageModel();
                                                        localStorageModel.solicitudCreditoId = registerFirstStepModelResult.codigoSolCredito;
                                                        localStorageModel.step = 2;
                                                        this.storageManager.savePermanentData(localStorageModel, LocalStoreManager.DBKEY_USER_DATA);
                                                        this.router.navigate([`/registerSecondStep/${registerFirstStepModelResult.codigoSolCredito}`]);
                                                    },
                                                    error => console.error(error)
                                                );
                                            }
                                        },
                                        error => console.error(error),
                                    );
                                }
                            }, error => alert('Algún dato personal ingresado no es válido. Revise su número de DNI, nombres, apellidos y actualícelos donde encuentre una inconsistencia. Luego continúe con su registro.')
                            );
                    }
                }
                else {
                    alert('Algún dato personal ingresado no es válido. Revise su número de DNI, nombres, apellidos y actualícelos donde encuentre una inconsistencia. Luego continúe con su registro.');
                }
            }, error => alert('Algún dato personal ingresado no es válido. Revise su número de DNI, nombres, apellidos y actualícelos donde encuentre una inconsistencia. Luego continúe con su registro.')
            );

        return;
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
