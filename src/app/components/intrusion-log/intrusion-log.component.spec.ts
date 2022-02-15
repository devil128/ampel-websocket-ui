import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrusionLogComponent } from './intrusion-log.component';

describe('IntrusionLogComponent', () => {
  let component: IntrusionLogComponent;
  let fixture: ComponentFixture<IntrusionLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntrusionLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrusionLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
