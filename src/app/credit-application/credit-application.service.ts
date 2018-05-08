import { Injectable } from '@angular/core';

import { HttpService } from '../services/http.service';

import { BaseResponse, CreditApplication, CreditApplicationDTO, DetailProfitability,
         DetailProfitabilityRequest, DetailProfitabilityResponse, Parameter,
         ParameterDTO, Profitability, ProfitabilityDTO,
         SearchCreditApplicationDTO, SolicitudCredito, SolicitudCreditoRequest, UbigeoDTO} from './credit-application.model';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class CreditApplicationService {
  public solicitudCredito: SolicitudCredito = new SolicitudCredito();
  private methods = {
    params: {
      getByPadreId: (id: string) => `${HOST}/${MODULES.params}/GetByPadreID?id=${id}`,
    },
    creditApplication: {
      searchCreditApplication: () => `${HOST}/${MODULES.creditApplication}/SearchSolicitudCredito`,
      getSolicitudCreditoByCode: (code: string) => `${HOST}/${MODULES.creditApplication}/GetSolicitudCreditoByCodigo?codigo=${code}`,
      cancelProcess: (codSolicitud: string, motivoCancelacionId: string) =>
        `${HOST}/${MODULES.creditApplication}/CancelarProceso?codigoSolicitud=${codSolicitud}&motivoCancelacionId=${motivoCancelacionId}`,
      saveSolicitud: () => `${HOST}/${MODULES.creditApplication}/GuardarSolicitud`,
    },
    ubigeo: {
      getByPadreId: (id: string | number) => `${HOST}/${MODULES.ubigeo}/GetByPadreID?id=${id}`,
    },
    ingreso: {
      getReporteRentabilidad: (cod: string) => `${HOST}/${MODULES.ingreso}/GetReporteRentabilidad?codigoInversor=${cod}`,
      getReporteRentabilidadDetalle: () => `${HOST}/${MODULES.ingreso}/GetReporteRentabilidadDetalle`,
    },
    file: {
      GetByApplicationCode: (cod: string) => `${HOST}/${MODULES.file}/GetByCodigoSolCredito?id=${cod}`,
    },
  };

  constructor(private http: HttpService) { }

  cancelProcess(codigoSolicitud: string, motivoCancelacionId: string): Observable<any> {
    return this.http
      .put(this.methods.creditApplication.cancelProcess(codigoSolicitud, motivoCancelacionId));
  }

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

  getAllActivityArea(): Observable<Parameter[]> {
    return this.getAnyParamList(PARAMS_IDS.activityArea);
  }

  getAllJobs(): Observable<Parameter[]> {
    return this.getAnyParamList(PARAMS_IDS.job);
  }

  getAllBank(): Observable<Parameter[]> {
    return this.getAnyParamList(PARAMS_IDS.bank);
  }

  getAllReasons(): Observable<Parameter[]> {
    return this.getAnyParamList(PARAMS_IDS.reasonCancel);
  }

  getAllTypeAccount(): Observable<Parameter[]> {
    return this.getAnyParamList(PARAMS_IDS.typeAccount);
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

  getCreditApplicationByCode(code: string): Observable<SolicitudCredito> {
    return this.http
      .get<SolicitudCredito>(this.methods.creditApplication.getSolicitudCreditoByCode(code))
      .map<SolicitudCredito, SolicitudCredito>((solicitudCredito) => {
        const fechaNacimientoArray = (solicitudCredito.FechaNacimiento || '').toString().split('/');
        const year = +fechaNacimientoArray[2] || 0;
        const month = +fechaNacimientoArray[1] || 0;
        const day = +fechaNacimientoArray[0] || 0;
        solicitudCredito.SeguroDesgravamenId = +solicitudCredito.SeguroDesgravamenId;
        solicitudCredito.FechaNacimiento = year && month > -1 && day ? new Date(year, month - 1, day) : solicitudCredito.FechaNacimiento;
        return solicitudCredito;
      });
  }

  getFilesByApplicationCode(code: string): Observable<any> {
    return this.http
      .get<any>(this.methods.file.GetByApplicationCode(code))
      .map<any, any>((response) => {
        return response;
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

  getSeguroDesgravamen(): Observable<Parameter[]> {
    return this.getAnyParamList(PARAMS_IDS.seguroDesgravament);
  }

  getUbigeo(parentId: string | number = '0'): Observable<UbigeoDTO[]> {
    return this.http
      .get<UbigeoDTO[]>(this.methods.ubigeo.getByPadreId(parentId));
  }

  saveApplication(solicitud: SolicitudCreditoRequest): Observable<any> {
    return this.http
      .post(this.methods.creditApplication.saveSolicitud(), solicitud);
  }

  private getMonthByCode(code: number): string {
    return MONTH[code - 1];
  }
}

const HOST = 'http://valentineservices.azurewebsites.net/api';
const MODULES = {
  params: 'T_Parametro',
  creditApplication: 'T_SolicitudCredito',
  ubigeo: 'T_Ubigeo',
  ingreso: 'T_Ingreso',
  file: 'T_Archivo',
};

const PARAMS_IDS = {
  statusCreditApplication: '40',
  creditDestination: '10',
  documentType: '13',
  gender: '1',
  grade: '4',
  maritalStatus: '16',
  seguroDesgravament: '37',
  activityArea: '23',
  job: '26',
  typeAccount: '29',
  bank: '32',
  reasonCancel: '106',
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
