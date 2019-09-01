import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPluginDetailComponent } from './test-plugin-detail.component';

describe('TestPluginDetailComponent', () => {
  let component: TestPluginDetailComponent;
  let fixture: ComponentFixture<TestPluginDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPluginDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPluginDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
