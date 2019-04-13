import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../backend/models/account';
import { BackendService } from '../backend/backend.service';
//import { AccountBackend } from '../backend/backend';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @Input() account: Account;
  fields: Array<Object>;

  constructor(private backendService: BackendService) { }

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
