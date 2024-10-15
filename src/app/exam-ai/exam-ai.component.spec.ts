import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamAiComponent } from './exam-ai.component';

describe('ExamAiComponent', () => {
  let component: ExamAiComponent;
  let fixture: ComponentFixture<ExamAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamAiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
