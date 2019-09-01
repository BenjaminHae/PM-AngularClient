import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPluginEditComponent } from './test-plugin-edit.component';

describe('TestPluginEditComponent', () => {
  let component: TestPluginEditComponent;
  let fixture: ComponentFixture<TestPluginEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPluginEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPluginEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
