import { BaseModel } from './base.model';
export class EnviarMailModel extends BaseModel {
    
    Email: string;
    EmailType: number;

    constructor() {
        super();
    }
}
