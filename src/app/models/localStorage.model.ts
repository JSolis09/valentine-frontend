import { BaseModel } from './base.model';
export class LocalStorageModel extends BaseModel {
    solicitudCreditoId: number;
    step: number;
    
    constructor() {
        super();
    }
}
