import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlDeviceDialogComponent } from './access-control-device-dialog.component';

describe('AccessControlDeviceDialogComponent', () => {
  let component: AccessControlDeviceDialogComponent;
  let fixture: ComponentFixture<AccessControlDeviceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessControlDeviceDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessControlDeviceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
