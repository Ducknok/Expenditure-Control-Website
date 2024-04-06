import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPassword3Component } from './forget-password-3.component';

describe('ForgetPassword3Component', () => {
  let component: ForgetPassword3Component;
  let fixture: ComponentFixture<ForgetPassword3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetPassword3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgetPassword3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
