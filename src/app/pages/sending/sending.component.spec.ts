import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingComponent } from './sending.component';

describe('SendingComponent', () => {
  let component: SendingComponent;
  let fixture: ComponentFixture<SendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
