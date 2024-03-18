import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BinarySensorComponent } from './binary-sensor.component';

describe('BinarySensorComponent', () => {
  let component: BinarySensorComponent;
  let fixture: ComponentFixture<BinarySensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BinarySensorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BinarySensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
