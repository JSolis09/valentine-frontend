import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { ClipsRequestModel, ClipsServiceResponseModel } from '../models';
import { EnviromentsConstants, HostnameConstants, ValuesClipsConstants } from '../shared/constants';
import { HttpService } from './http.service';
import { Utilities } from './utilities';

@Injectable()
export class ClipsService {
    private URL: string;
    constructor(private httpService: HttpService) {
        if (this.httpService.enviroment === EnviromentsConstants.BD) {
            this.URL = HostnameConstants.CLIPS_WEBAPI.host;
        }
    }

    public getResultEvaluation(model: ClipsRequestModel): Observable<ClipsServiceResponseModel> {
        this.URL = `${this.URL}`;
        return this.httpService.post(this.URL, model);
    }
}
