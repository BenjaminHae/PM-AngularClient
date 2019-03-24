import { Injectable } from '@angular/core';
import { UserService, MaintenanceService as OpenAPIMaintenanceService, ServerInformation } from '@pm-server/pm-server';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private maintenanceService: OpenAPIMaintenanceService, private userService: UserService) { }

  retrieveInfo(): void {
    this.maintenanceService
      .serverInformation()
      .subscribe((serverInformation: ServerInformation) => {
        this.maintenanceService.configuration.apiKeys["X-CSRF-TOKEN"] = serverInformation.csrfToken;
        this.userService.configuration.apiKeys["X-CSRF-TOKEN"] = serverInformation.csrfToken;
      });
  }
}
