import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPluginColumnComponent } from './test-plugin-column.component';

describe('TestPluginColumnComponent', () => {
  let component: TestPluginColumnComponent;
  let fixture: ComponentFixture<TestPluginColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPluginColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPluginColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
