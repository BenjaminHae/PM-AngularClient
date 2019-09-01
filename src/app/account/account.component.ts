import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Account } from '../backend/models/account';
import { BackendService } from '../backend/backend.service';
//import { AccountBackend } from '../backend/backend';
import { PluginManagerService } from '../plugins/plugin-manager.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @Input() account: Account;
  @ViewChild('plugindetails', {static: false, read: ViewContainerRef}) set ft(pluginDetails: ViewContainerRef) {
    setTimeout(() => {
        if(pluginDetails) {
          this.pluginManager.fillDetails(pluginDetails, this.account);
        }
      });
  };
  fields: Array<Object>;

  constructor(private backendService: BackendService, private pluginManager: PluginManagerService) { }

  ngOnInit() {
    /*
    this.backendService.waitForBackend()
      .then((backend) => {
        this.fields = [];
        if (this.account) {
          for (var item in backend.fields) {
            this.fields.push({"name": backend.fields[item]["colname"], "value": this.account.other[item]});
          }
        }
        else
          console.log("no account");
      });
    */
  }

}
