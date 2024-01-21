import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlSystemComponent } from './access-control-system.component';

describe('AccessControlSystemComponent', () => {
  let component: AccessControlSystemComponent;
  let fixture: ComponentFixture<AccessControlSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessControlSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessControlSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
