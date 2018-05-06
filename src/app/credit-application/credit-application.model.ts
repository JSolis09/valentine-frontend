export class Parameter {
  id: number;
  name: string;
  parent: number;
}

export class ParameterDTO {
  ID: number;
  Nombre: string;
  Padre: number;
}

export class CreditApplication {
  code: string | number;
  name: string;
  documentNumber: string;
  amount: number;
  date: Date;
  period: number;
  status: string;
  penTea: number;
  finalTea: number;
}

export class CreditApplicationResponse {
  data: CreditApplicationDTO[];
  total: number;
}

export class CreditApplicationDTO {
  CodigoSolCredito: number;
  NombreCompleto: string;
  NumeroDocumento: string;
  MontoSolicitado: number;
  FechaRegistro: Date;
  PlazoPrestamo: number;
  EstadoId: number;
  EstadoDescripcion: string;
  TeaAsignada: number;
  TeaFinal: number;
}

export class SearchCreditApplicationDTO {
  NumeroDocumento: string = '';
  Solicitante: string = '';
  EstadoId: string = null;
  DestinoCreditoId: string = null;
  FechaDesde: Date = null;
  FechaHasta: Date = null;
  Paginacion?: PaginationDTO = new PaginationDTO();
}

export class PaginationDTO {
  Total: number = 0;
  Page: number = 1;
  PageSize: number = 10;
}

export class Schedule {
  id?: string;
  amount: number;
  expiryDate: Date;
  status: string;
  fee: number;
  interest: number;
  expense: number;
  payment: number;
  paymentDate: Date;
  arrears: number;
  debt: number;
}

export class UbigeoDTO {
  Nombre: string;
  Ubigeo_ID: number;
  Ubigeo_Padre: number;
}
