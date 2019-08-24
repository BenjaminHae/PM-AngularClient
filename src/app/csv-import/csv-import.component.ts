import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CsvParser } from '../csv/csvParser';
import { CsvConverter } from '../csv/csvConverter';
import { BackendService } from '../backend/backend.service';
import { CryptoService } from '../backend/crypto.service';

@Component({
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.css']
})
export class CsvImportComponent implements OnInit {
  file:any;
  parser: CsvParser;
  importer: CsvConverter;
  headers: Array<string>;
  headersSelector: Array<string>;
  message: string;
  mapping:  Map<string, string>;
  availableFields: Array<string>;

  constructor(private crypto: CryptoService, private backend: BackendService, public dialogRef: MatDialogRef<CsvImportComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.availableFields = ["username", "password", "test"];
    this.importer = new CsvConverter(this.crypto);
  }

  fileChanged(e) {
    this.parser = new CsvParser();
    this.importer.availableFields = this.availableFields;
    this.file = e.target.files[0];
    this.message = "reading file";
    this.createPreview();
  }

  createPreview(): void {
    this.parser.preview(this.file)
      .then(() => {
            this.importer.autoHeaderMapping(this.parser.getHeaders());
            this.showInformation();
            this.message = "file read, using delimiter '" + this.parser.getDelimiter() + "'";
          });
  }

  showInformation(): void {
    this.headers = this.parser.getHeaders();
    this.headersSelector = this.headers.map(s => s+"_selector");
    this.mapping = this.importer.getHeaderMappings();
  }

  getRows(): Array<object> {
    if (this.parser) {
      return this.parser.getRows();
    }
    return [];
  }

  importData(): void {
    this.parser.parseFile(this.file)
      .then(() => {
          console.log(" creating Accounts");
          return this.importer.createAccounts(this.getRows());
        })
      .then((accounts) => {
          console.log(" sending to backend");
          return this.backend.addAccounts(accounts);
        })
      .then((observable) => {
        observable.subscribe();
      });
  }

  onMappingChange(key, value: string) {
    this.importer.setHeaderMapping(key, value);
    this.mapping = this.importer.getHeaderMappings();
  }

  abort() {
    this.dialogRef.close();
  }

}
