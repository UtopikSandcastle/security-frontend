import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlDeviceButtonComponent } from './access-control-device-button.component';

describe('AccessControlDeviceButtonComponent', () => {
  let component: AccessControlDeviceButtonComponent;
  let fixture: ComponentFixture<AccessControlDeviceButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessControlDeviceButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessControlDeviceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
