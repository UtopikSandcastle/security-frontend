import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlDeviceComponent } from './access-control-device.component';

describe('AccessControlDeviceComponent', () => {
  let component: AccessControlDeviceComponent;
  let fixture: ComponentFixture<AccessControlDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessControlDeviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessControlDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
