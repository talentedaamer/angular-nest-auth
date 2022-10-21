import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigLoader} from "./config-loader";


@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly configLoader: ConfigLoader
  ) {}

  get<T>(relativeUrl: string, params: any = null, fullResponse: boolean = false): Observable<T> {
    const httpParams = (params) ? new HttpParams() : undefined;
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre- check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    const prms: { params?: HttpParams, headers?: HttpHeaders } = { headers };
    if (httpParams) {
      Object.keys(params).forEach(key => httpParams.set(key, params[key]));
      prms.params = httpParams;
    }
    if (prms) {
      return this.httpClient.get<T>(`${this.configLoader.apiPrefix()}/${relativeUrl}`, prms);
    } else if (!fullResponse) {
      return this.httpClient.get<T>(`${this.configLoader.apiPrefix()}/${relativeUrl}`, prms) as any;
    } else if (fullResponse) {
      return this.httpClient.get<T>(`${this.configLoader.apiPrefix()}/${relativeUrl}`, {observe: 'response', headers}) as any;
    }

    return this.httpClient.get<T>(`${this.configLoader.apiPrefix()}/${relativeUrl}`);
  }

  post<T>(relativeUrl: string, body: any): Observable<T> {
    return this.httpClient.post<T>(`${this.configLoader.apiPrefix()}/${relativeUrl}`, body);
  }

  put<T>(relativeUrl: string, body: any= null): Observable<T> {
    return this.httpClient.put<T>(`${this.configLoader.apiPrefix()}/${relativeUrl}`, body);
  }

  delete<T>(relativeUrl: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.configLoader.apiPrefix()}/${relativeUrl}`);
  }
}
