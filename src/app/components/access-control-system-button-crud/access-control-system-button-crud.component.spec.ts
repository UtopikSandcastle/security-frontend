import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlSystemButtonCrudComponent } from './access-control-system-button-crud.component';

describe('AccessControlSystemButtonCrudComponent', () => {
  let component: AccessControlSystemButtonCrudComponent;
  let fixture: ComponentFixture<AccessControlSystemButtonCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessControlSystemButtonCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessControlSystemButtonCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
