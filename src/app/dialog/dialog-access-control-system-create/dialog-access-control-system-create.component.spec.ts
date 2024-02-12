import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAccessControlSystemCreateComponent } from './dialog-access-control-system-create.component';

describe('DialogAccessControlSystemCreateComponent', () => {
  let component: DialogAccessControlSystemCreateComponent;
  let fixture: ComponentFixture<DialogAccessControlSystemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAccessControlSystemCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAccessControlSystemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
