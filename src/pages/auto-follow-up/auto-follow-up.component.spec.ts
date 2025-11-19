import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoFollowupPageComponent } from './auto-follow-up.component';

describe('AutoFollowupPageComponent', () => {
  let component: AutoFollowupPageComponent;
  let fixture: ComponentFixture<AutoFollowupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoFollowupPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutoFollowupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
