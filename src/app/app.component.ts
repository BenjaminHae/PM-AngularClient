import { Component, OnInit } from '@angular/core';
import { BackendService } from './backend/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'passwordManager';
  touchIdAvailable: boolean = false;
  message: string = "";
  backendReady: boolean = false;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    console.log("oninit");
    this.backendService.waitForBackend()
      .then(() => { this.backendReady = true; });
  }
}
