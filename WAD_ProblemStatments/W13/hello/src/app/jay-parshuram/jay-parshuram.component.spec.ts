import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JayParshuramComponent } from './jay-parshuram.component';

describe('JayParshuramComponent', () => {
  let component: JayParshuramComponent;
  let fixture: ComponentFixture<JayParshuramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JayParshuramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JayParshuramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
