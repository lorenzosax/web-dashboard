import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LoginResponse} from '../dto/LoginResponse';
import {map} from 'rxjs/operators';
import {RouteDTO} from '../dto/RouteDTO';
import {VehicleDTO} from '../dto/VehicleDTO';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static BASE_ENDPOINT = 'http://localhost:8080/api/city';
  private static LOGIN_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/users/login';
  private static GET_ROUTES_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/routes';
  private static GET_VEHICLES_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/vehicles';
  private static VEHICLE_PARAMS_CONFIGURATION_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/vehicles/{}/configuration';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    const body = { username, password};
    return this.http.post<LoginResponse>(ApiService.LOGIN_API_ENDPOINT, body);
  }

  routes(): Observable<Array<RouteDTO>> {
    return this.http.get<Array<RouteDTO>>(ApiService.GET_ROUTES_API_ENDPOINT);
  }

  vehicles(): Observable<Array<VehicleDTO>> {
    return this.http.get<Array<VehicleDTO>>(ApiService.GET_VEHICLES_API_ENDPOINT);
  }

  saveParamsConfiguration(licensePlate: string, occupancyTarget: number,
                          inertialTimeTarget: number, waitingTimeTarget: number): Observable<any> {
    const endpoint = ApiService.VEHICLE_PARAMS_CONFIGURATION_API_ENDPOINT.replace('{}', licensePlate);
    const body = {occupancyTarget, inertialTimeTarget, waitingTimeTarget};
    return this.http.post<any>(endpoint, body);
  }
}
