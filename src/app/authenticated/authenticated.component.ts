import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Account } from '../backend/models/account';
import { PluginManagerService } from '../plugins/plugin-manager.service';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css']
})
export class AuthenticatedComponent implements OnInit {
  @ViewChild('pluginoverview', {static: false, read: ViewContainerRef}) set ft(plugins: ViewContainerRef) {
    setTimeout(() => {
        if(plugins) {
          console.log(plugins);
          this.pluginManager.fillOverview(plugins, this.backend.accounts);
        }
      });
  };
  public selectedAccount: Account = null;

  constructor(public backend: BackendService, private pluginManager: PluginManagerService) { }

  ngOnInit() {
  }

}
