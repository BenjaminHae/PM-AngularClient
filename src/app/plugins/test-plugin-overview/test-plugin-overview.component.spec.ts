import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPluginOverviewComponent } from './test-plugin-overview.component';

describe('TestPluginOverviewComponent', () => {
  let component: TestPluginOverviewComponent;
  let fixture: ComponentFixture<TestPluginOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPluginOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPluginOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
