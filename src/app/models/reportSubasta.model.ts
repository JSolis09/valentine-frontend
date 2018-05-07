import { BaseModel } from './base.model';

export class ReportSubastaModel extends BaseModel {
    fechaTermino: string;
    TotalSubastas: number;
    FondosExactos: number;
    FondosMinimos: number;
    SinFondos: number;
}