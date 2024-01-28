import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlSystemsComponent } from './access-control-systems.component';

describe('AccessControlSystemsComponent', () => {
  let component: AccessControlSystemsComponent;
  let fixture: ComponentFixture<AccessControlSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessControlSystemsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessControlSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
