import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-csv-destination-selector',
  templateUrl: './csv-destination-selector.component.html',
  styleUrls: ['./csv-destination-selector.component.css']
})
export class CsvDestinationSelectorComponent implements OnInit {
  @Input() selected: string;
  @Input() availableFields: Array<string>;
  @Output() selectedChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onChange(value) {
    this.selectedChange.emit(value);
  }
}
