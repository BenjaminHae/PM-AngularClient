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
  mapping:  Map<string, string>;
  availableFields: Array<string>;

  constructor() { }

  ngOnInit() {
    this.availableFields = ["username", "password", "test"];
  }

  fileChanged(e) {
    this.parser = new CsvParser();
    this.parser.availableFields = this.availableFields;
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
    this.mapping = this.parser.getHeaderMappings();
  }

  showMapping(): void {
  }

  importData(): void {
  }

}
