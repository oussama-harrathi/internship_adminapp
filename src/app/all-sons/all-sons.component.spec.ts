import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSonsComponent } from './all-sons.component';

describe('AllSonsComponent', () => {
  let component: AllSonsComponent;
  let fixture: ComponentFixture<AllSonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllSonsComponent]
    });
    fixture = TestBed.createComponent(AllSonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
