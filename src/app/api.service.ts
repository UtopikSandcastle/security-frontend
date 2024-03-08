import { Injectable } from '@angular/core';
import { AccessControlDeviceService, AccessControlSystem, AccessControlSystemService } from '@utopiksandcastle/accesscontrol-api-client';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    public accessControlSystemService: AccessControlSystemService,
    public accesControleDeviceService: AccessControlDeviceService
  ) {
    accessControlSystemService.configuration.basePath = environment.accessControlApiBaseUrl
    accesControleDeviceService.configuration.basePath = environment.accessControlApiBaseUrl;
  }
}
