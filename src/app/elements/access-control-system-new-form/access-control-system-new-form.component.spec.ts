import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlSystemNewFormComponent } from './access-control-system-new-form.component';

describe('AccessControlSystemNewFormComponent', () => {
  let component: AccessControlSystemNewFormComponent;
  let fixture: ComponentFixture<AccessControlSystemNewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessControlSystemNewFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessControlSystemNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
