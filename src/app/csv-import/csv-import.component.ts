import { Component, OnInit } from '@angular/core';
import { CsvParser } from '../csv/csvParser';

@Component({
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.css']
})
export class CsvImportComponent implements OnInit {
  file:any;
  parser: CsvParser;
  headers: Array<string>;
  message: string;
  accounts: Array<any>;

  constructor() { }

  ngOnInit() {
    this.parser = new CsvParser();
  }

  fileChanged(e) {
      this.file = e.target.files[0];
      this.message = "reading file";
      this.createPreview();
  }

  createPreview(): void {
    this.parser.preview(this.file)
      .then(() => {
            this.showInformation();
            this.message = "file read";
          });
  }

  showInformation(): void {
    this.headers = this.parser.getHeaders();
    this.accounts = this.parser.getRows();
  }

}
