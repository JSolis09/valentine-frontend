import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { EnviromentsConstants } from '../shared/constants';

@Injectable()
export class HttpService {

    enviroment: string = EnviromentsConstants.BD;

    constructor(private http: Http) {

    }

    public get<T>(url: string, options: any = null): Observable<T> {
        return this.http.get(url, options)
            .map((res: Response) => res.json());
    }

    public post<T>(url: string, data: any, options?: any): Observable<T> {
        return this.http.post(url, data, options)
            .map((res: Response) => res.json());
    }

    public put<T>(url: string, data?: any, options?: any): Observable<T> {
        return this.http.put(url, data, options)
            .map((res: Response) => res.json());
    }

    public delete<T>(url: string): Observable<T> {
        return this.http.delete(url)
            .map((res: Response) => res.json());
    }

    private handleError(error: any) {
        let errorMsg: string = error.text();
        const messages: string[] = [];
        if (error.status === 422) {
            if (errorMsg.startsWith('{')) {
                const errorMsgJson = JSON.parse(errorMsg);

                for (const item in errorMsgJson) {
                    if (errorMsgJson[item])
                        messages.push(errorMsgJson[item]);
                }

            }
            errorMsg = messages.join('\n');
        }
        // errorMsg = error.message || errorMsg;
        // errorMsg = !error.message && error.status && `${error.status} - ${error.statusText}` || errorMsg;
        return Observable.throw(errorMsg);
    }
}
