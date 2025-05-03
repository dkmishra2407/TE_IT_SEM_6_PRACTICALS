import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloDevanshComponent } from './hello-devansh.component';

describe('HelloDevanshComponent', () => {
  let component: HelloDevanshComponent;
  let fixture: ComponentFixture<HelloDevanshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloDevanshComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelloDevanshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
