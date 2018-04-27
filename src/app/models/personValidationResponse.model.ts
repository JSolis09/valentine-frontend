import { BaseModel } from './base.model';
export class PersonValidationResponseModel extends BaseModel {
    NumeroDni: string;
    DigitoVerificacion: string;
    PrimerNombre: string;
    SegundoNombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    FechaNacimiento: string;

    constructor() {
        super();
    }
}
