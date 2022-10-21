import { Injectable } from '@angular/core';
import {ApiClientService} from "../core/api-client.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly _apiClient: ApiClientService
  ) {}

  login(data: any): Promise<any> {
    return this._apiClient.post('login', data).toPromise();
  }

  currentUser(): Promise<any> {
    return this._apiClient.get('user').toPromise();
  }
}
