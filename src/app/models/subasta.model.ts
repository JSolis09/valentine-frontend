import { BaseModel } from './base.model';
export class SubastaModel extends BaseModel {
    codigoSubasta: number;
    montoASubastar: number;
    fechaInicio: string;
    fechaTermino: string;
    finalizarAlCompletar: number;
    montoRecaudado: number;
    fechaSolicitudAprobacion: string;
    fechaAprobacion: string;
    montoAceptado: number;
    numeroAcreedores: number;
    ratioProgreso: number;
    estado: number;
    codigoPrestamo: number;
    codigoSolCredito: number;

    constructor() {
        super();
    }
}
