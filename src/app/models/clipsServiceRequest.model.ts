import { BaseModel } from './base.model';
export class ClipsRequestModel extends BaseModel {
    NumeroDni: string;
    DigitoVerificacion: string;
    Nombres: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Parentesco: string;
    FechaNacimiento: string;

    constructor() {
        super();
    }
}
