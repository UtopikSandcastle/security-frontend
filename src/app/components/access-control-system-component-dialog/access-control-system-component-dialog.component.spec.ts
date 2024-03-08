import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlSystemComponentDialogComponent } from './access-control-system-component-dialog.component';

describe('AccessControlSystemComponentDialogComponent', () => {
  let component: AccessControlSystemComponentDialogComponent;
  let fixture: ComponentFixture<AccessControlSystemComponentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessControlSystemComponentDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessControlSystemComponentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
