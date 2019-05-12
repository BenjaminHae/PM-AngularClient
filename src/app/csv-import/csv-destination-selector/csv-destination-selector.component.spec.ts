import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvDestinationSelectorComponent } from './csv-destination-selector.component';

describe('CsvDestinationSelectorComponent', () => {
  let component: CsvDestinationSelectorComponent;
  let fixture: ComponentFixture<CsvDestinationSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvDestinationSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvDestinationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
