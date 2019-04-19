import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountComponent } from './add-account.component';

describe('EditAccountComponent', () => {
  let component: EditAccountComponent;
  let fixture: ComponentFixture<EditAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
