import { Injectable } from '@angular/core';
import { MaintenanceService as OpenAPIMaintenanceService, UserService, ServerInformation } from '@pm-server/pm-server';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private maintenanceService: OpenAPIMaintenanceService, private userService: UserService) { }

  retrieveInfo(): void {
    this.maintenanceService
      .serverInformation()
      .subscribe((serverInformation: ServerInformation) => {
        if (!this.maintenanceService.configuration.apiKeys)
          this.maintenanceService.configuration.apiKeys = {};
        this.maintenanceService.configuration.apiKeys["X-CSRF-TOKEN"] = serverInformation.csrfToken;
      });
  }
}
