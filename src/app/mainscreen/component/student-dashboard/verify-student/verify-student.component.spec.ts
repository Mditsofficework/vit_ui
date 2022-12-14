import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyStudentComponent } from './verify-student.component';

describe('VerifyStudentComponent', () => {
  let component: VerifyStudentComponent;
  let fixture: ComponentFixture<VerifyStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
