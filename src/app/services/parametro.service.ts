import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { ParametroModel } from '../models';
import { EnviromentsConstants, HostnameConstants } from '../shared/constants';
import { HttpService } from './http.service';
import { Utilities } from './utilities';

@Injectable()
export class ParametroService {
    private PARAMETRO_ENDPOINT: string = 'T_Parametro';
    private BASE_URL: string = Utilities.buildRequestURL(
        HostnameConstants.VALENTINE_WEBAPI.host);
    private REQUEST_URL: string;
    private URL: string;
    constructor(private httpService: HttpService) {
        if (this.httpService.enviroment === EnviromentsConstants.BD) {
            this.REQUEST_URL = `${this.BASE_URL}${this.PARAMETRO_ENDPOINT}`;
        }
    }

    public getByPadreID(padreId: number): Observable<ParametroModel[]> {
        this.URL = `${this.REQUEST_URL}/${padreId}`;
        return this.httpService.get(this.URL);
    }
}
