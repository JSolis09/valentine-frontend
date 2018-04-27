import { BaseModel } from './base.model';
export class PersonValidationRequestModel extends BaseModel {
    NumeroDni: string;
    DigitoVerificacion: string;
    Nombres: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;

    constructor() {
        super();
    }
}
