import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlSystemCardComponent } from './access-control-system-card.component';

describe('AccessControlSystemCardComponent', () => {
  let component: AccessControlSystemCardComponent;
  let fixture: ComponentFixture<AccessControlSystemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessControlSystemCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessControlSystemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
