import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavAuthenticatedComponent } from './sidenav-authenticated.component';

describe('SidenavAuthenticatedComponent', () => {
  let component: SidenavAuthenticatedComponent;
  let fixture: ComponentFixture<SidenavAuthenticatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavAuthenticatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavAuthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
