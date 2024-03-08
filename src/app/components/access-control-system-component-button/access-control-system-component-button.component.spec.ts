import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlSystemComponentButtonComponent } from './access-control-system-component-button.component';

describe('AccessControlSystemComponentButtonComponent', () => {
  let component: AccessControlSystemComponentButtonComponent;
  let fixture: ComponentFixture<AccessControlSystemComponentButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessControlSystemComponentButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessControlSystemComponentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
