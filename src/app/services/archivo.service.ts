import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { ArchivoModel, UploadFileModel } from '../models';
import { EnviromentsConstants, HostnameConstants } from '../shared/constants';
import { HttpService } from './http.service';
import { Utilities } from './utilities';

@Injectable()
export class ArchivoService {
    private T_ARCHIVO_ENDPOINT: string = 'T_Archivo';
    private BASE_URL: string = Utilities.buildRequestURL(
        HostnameConstants.VALENTINE_WEBAPI.host);
    private REQUEST_URL: string;
    private URL: string;
    constructor(private httpService: HttpService) {
        if (this.httpService.enviroment === EnviromentsConstants.BD) {
            this.REQUEST_URL = `${this.BASE_URL}${this.T_ARCHIVO_ENDPOINT}`;
        }
    }

    public uploadFile(model: UploadFileModel[]): Observable<UploadFileModel[]> {
        this.URL = `${this.REQUEST_URL}`;
        return this.httpService.put(this.URL, model);
    }

    public saveFile(model: ArchivoModel): Observable<ArchivoModel> {
        this.URL = `${this.REQUEST_URL}`;
        return this.httpService.post(this.URL, model);
    }
}