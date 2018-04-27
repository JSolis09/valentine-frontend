import { BaseModel } from './base.model';
export class ClipsServiceResponseModel extends BaseModel {
    Resultado: string;
    PuntuacionBuro: number;

    constructor() {
        super();
    }
}
