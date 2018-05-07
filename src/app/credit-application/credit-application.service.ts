import { Injectable } from '@angular/core';

import { HttpService } from '../services/http.service';

import { BaseResponse, CreditApplication, CreditApplicationDTO, DetailProfitability,
         DetailProfitabilityRequest, DetailProfitabilityResponse, Parameter,
         ParameterDTO, Profitability, ProfitabilityDTO,
         SearchCreditApplicationDTO, SolicitudCredito, UbigeoDTO} from './credit-application.model';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class CreditApplicationService {
  public solicitudCredito: SolicitudCredito = new SolicitudCredito();
  private methods = {
    params: {
      getByPadreId: (id: string) => `${HOST}/${PREFIX}/${MODULES.params}/GetByPadreID?id=${id}`,
    },
    creditApplication: {
      searchCreditApplication: () => `${HOST}/${PREFIX}/${MODULES.creditApplication}/SearchSolicitudCredito`,
    },
    ubigeo: {
      getByPadreId: (id: string) => `${HOST}/${PREFIX}/${MODULES.ubigeo}/GetByPadreID?id=${id}`,
    },
    ingreso: {
      getReporteRentabilidad: (cod: string) => `${HOST}/${PREFIX}/${MODULES.ingreso}/GetReporteRentabilidad?codigoInversor=${cod}`,
      getReporteRentabilidadDetalle: () => `${HOST}/${PREFIX}/${MODULES.ingreso}/GetReporteRentabilidadDetalle`,
    },
  };

  constructor(private http: HttpService) { }

  getAnyParamList(id: string): Observable<Parameter[]> {
    return this.http
    .get<ParameterDTO[]>(this.methods.params.getByPadreId(id))
    .map<ParameterDTO[], Parameter[]>((parametersDTO: ParameterDTO[]) => {
      parametersDTO = parametersDTO || [];
      return parametersDTO.map((parameterDto) => {
        return {
          id: parameterDto.ID,
          name: parameterDto.Nombre,
          parent: parameterDto.Padre,
        };
      });
    });
  }

  getAllStatusCreditApplication(): Observable<Parameter[]> {
    return this.getAnyParamList(PARAMS_IDS.statusCreditApplication);
  }

  getAllCreditDestination(): Observable<Parameter[]> {
    return this.getAnyParamList(PARAMS_IDS.creditDestination);
  }

  getAllDocumentType(): Observable<Parameter[]> {
    return this.getAnyParamList(PARAMS_IDS.documentType);
  }

  getAllGender(): Observable<Parameter[]> {
    return this.getAnyParamList(PARAMS_IDS.gender);
  }

  getAllGrade(): Observable<Parameter[]> {
    return this.getAnyParamList(PARAMS_IDS.grade);
  }

  getAllMaritalStatus(): Observable<Parameter[]> {
    return this.getAnyParamList(PARAMS_IDS.maritalStatus);
  }

  getCodeByMonthName(month: string): number {
    return MONTH.indexOf(month) + 1;
  }

  getCreditApplication(creditApplication: SearchCreditApplicationDTO): Observable<BaseResponse<CreditApplication>> {
    return this.http
      .post<BaseResponse<CreditApplicationDTO>>(this.methods.creditApplication.searchCreditApplication(), creditApplication)
      .map<BaseResponse<CreditApplicationDTO>, BaseResponse<CreditApplication>>((response) => {
        const list = response.data;
        const data: CreditApplication[] = list.map((applicationDto: CreditApplicationDTO) => {
          return {
            amount: applicationDto.MontoSolicitado,
            code: applicationDto.CodigoSolCredito,
            date: applicationDto.FechaRegistro,
            documentNumber: applicationDto.NumeroDocumento,
            finalTea: applicationDto.TeaFinal ? applicationDto.TeaFinal / 100 : null,
            name: applicationDto.NombreCompleto,
            penTea: applicationDto.TeaAsignada ? applicationDto.TeaAsignada / 100 : null,
            period: applicationDto.PlazoPrestamo,
            status: applicationDto.EstadoDescripcion,
          };
        });
        return {
          data,
          total: response.total,
        };
      });
  }

  getProfitabilityReport(inversorId: string): Observable<Profitability[]> {
    return this.http
      .get<ProfitabilityDTO[]>(this.methods.ingreso.getReporteRentabilidad(inversorId))
      .map<ProfitabilityDTO[], Profitability[]>((response) => {
        response = response || [];
        return response.map((profitabilityDto: ProfitabilityDTO) => {
          return {
            period: `${this.getMonthByCode(profitabilityDto.Mes)} ${profitabilityDto.Anio}`,
            capital: profitabilityDto.Capital,
            interest: profitabilityDto.Interes,
            mora: profitabilityDto.Moras,
            commission: profitabilityDto.Comision,
            repayment: profitabilityDto.RetornoNeto,
            fee: profitabilityDto.Cuotas,
          };
        });
      });
  }

  getProfitabilityDetailReport(data: DetailProfitabilityRequest): Observable<BaseResponse<DetailProfitability>> {
    return this.http
      .post<BaseResponse<DetailProfitabilityResponse>>(this.methods.ingreso.getReporteRentabilidadDetalle(), data)
      .map<BaseResponse<DetailProfitabilityResponse>, BaseResponse<DetailProfitability>>((response) => {
        const list = response.data;
        const detailProfitabilityList: DetailProfitability[] = list.map((detailProfitability: DetailProfitabilityResponse) => {
          return {
            loanFee: detailProfitability.CuotaPrestamo,
            capital: detailProfitability.Capital,
            interest: detailProfitability.Interes,
            mora: detailProfitability.Moras,
            commission: detailProfitability.Comision,
            repayment: detailProfitability.RetornoNeto,
            fee: detailProfitability.Cuota,
            expiredDate: detailProfitability.Vence,
            status: detailProfitability.EstadoNombre,
            amount: detailProfitability.Monto,
            rate: detailProfitability.Tasa,
          };
        });
        return {
          data: detailProfitabilityList,
          total: response.total,
        };
      });
  }

  getUbigeo(parentId: string = '0'): Observable<UbigeoDTO[]> {
    return this.http
      .get<UbigeoDTO[]>(this.methods.ubigeo.getByPadreId(parentId));
  }

  private getMonthByCode(code: number): string {
    return MONTH[code - 1];
  }
}

const HOST = 'http://valentineservices.azurewebsites.net';
const PREFIX = 'api';
const MODULES = {
  params: 'T_Parametro',
  creditApplication: 'T_SolicitudCredito',
  ubigeo: 'T_Ubigeo',
  ingreso: 'T_Ingreso',
};

const PARAMS_IDS = {
  statusCreditApplication: '40',
  creditDestination: '10',
  documentType: '13',
  gender: '1',
  grade: '4',
  maritalStatus: '16',
};

const MONTH: string[] = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Setiembre',
  'Octubre',
  'Noviembre',
  'Diciemnbre',
];
