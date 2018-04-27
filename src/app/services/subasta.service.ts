import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { SubastaModel } from '../models';
import { EnviromentsConstants, HostnameConstants } from '../shared/constants';
import { HttpService } from './http.service';
import { Utilities } from './utilities';

@Injectable()
export class SubastaService {
    private SUBASTA_ENDPOINT: string = 'T_Subasta';
    private BASE_URL: string = Utilities.buildRequestURL(
        HostnameConstants.VALENTINE_WEBAPI.host);
    private REQUEST_URL: string;
    private URL: string;
    constructor(private httpService: HttpService) {
        if (this.httpService.enviroment === EnviromentsConstants.BD) {
            this.REQUEST_URL = `${this.BASE_URL}${this.SUBASTA_ENDPOINT}`;
        }
    }

    public addSubasta(model: SubastaModel): Observable<SubastaModel> {
        this.URL = `${this.REQUEST_URL}`;
        return this.httpService.post(this.URL, model);
    }
}
