import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-unauthenticated',
  templateUrl: './unauthenticated.component.html',
  styleUrls: ['./unauthenticated.component.css']
})
export class UnauthenticatedComponent implements OnInit {
  showRegistration: boolean = false;

  constructor(private backend: BackendService) { }

  ngOnInit() {
  }

  toggleRegistrationLogin() {
    this.showRegistration = !this.showRegistration;
    if (!this.backend.serverSettings.allowRegistration) {
      this.showRegistration = false;
    }
  }
}
