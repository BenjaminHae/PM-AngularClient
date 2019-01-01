import { Component, OnInit } from '@angular/core';
import { TouchidService } from './touchid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'passwordManager';
  touchIdAvailable: boolean = false;
  message: String = "";

  constructor(private touchidService: TouchidService) { }

  ngOnInit() {
    if (this.touchidService.is_installed()) {
      this.touchidService.available()
        .then(() => { 
		this.touchIdAvailable = true; 
		this.prepareKeys();
	})
    }
  }
  prepareKeys(): void {
	this.touchidService.hasKey("account")
		.then(() => {
			this.touchidService.getKey("account", "trying to access the master key")
				.then((key) => {
					this.message = "master key is " + key;
				})
				.catch((err) => {
					this.message = "accessing master key failed: " + err;
				});
		})
		.catch(() => {
			this.touchidService.saveKey("account", "test")
				.then(() => {
					this.message = "stored the master key";
				})
				.catch((err) => {
					this.message = "storing master key failed: " + err;
				});
		});
  }
}
