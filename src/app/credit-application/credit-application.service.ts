import { Injectable } from '@angular/core';

import { HttpService } from '../services/http.service';
import { CreditApplication, CreditApplicationDTO, CreditApplicationResponse,
         Parameter, ParameterDTO, SearchCreditApplicationDTO, SolicitudCredito, UbigeoDTO } from './credit-application.model';

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

  getUbigeo(parentId: string = '0'): Observable<UbigeoDTO[]> {
    return this.http
      .get<UbigeoDTO[]>(this.methods.ubigeo.getByPadreId(parentId));
  }

  getCreditApplication(creditApplication: SearchCreditApplicationDTO): Observable<CreditApplication[]> {
    return this.http
      .post<CreditApplicationResponse>(this.methods.creditApplication.searchCreditApplication(), creditApplication)
      .map<CreditApplicationResponse, CreditApplicationDTO[]>((response) => response.data )
      .map<CreditApplicationDTO[], CreditApplication[]>((response) => {
        response = response || [];
        return response.map((applicationDto: CreditApplicationDTO) => {
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
      });
  }
}

const HOST = 'http://valentineservices.azurewebsites.net';
const PREFIX = 'api';
const MODULES = {
  params: 'T_Parametro',
  creditApplication: 'T_SolicitudCredito',
  ubigeo: 'T_Ubigeo',
};

const PARAMS_IDS = {
  statusCreditApplication: '40',
  creditDestination: '10',
  documentType: '13',
  gender: '1',
  grade: '4',
  maritalStatus: '16',
};
