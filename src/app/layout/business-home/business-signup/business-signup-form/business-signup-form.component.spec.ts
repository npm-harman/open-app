import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSignupFormComponent } from './business-signup-form.component';

describe('BusinessSignupFormComponent', () => {
  let component: BusinessSignupFormComponent;
  let fixture: ComponentFixture<BusinessSignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSignupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
