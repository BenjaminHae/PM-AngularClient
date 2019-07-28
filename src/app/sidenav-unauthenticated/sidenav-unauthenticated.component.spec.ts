import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavUnauthenticatedComponent } from './sidenav-unauthenticated.component';

describe('SidenavUnauthenticatedComponent', () => {
  let component: SidenavUnauthenticatedComponent;
  let fixture: ComponentFixture<SidenavUnauthenticatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavUnauthenticatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavUnauthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
