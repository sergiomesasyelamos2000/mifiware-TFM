import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationSensorComponent } from './location-sensor.component';

describe('LocationSensorComponent', () => {
  let component: LocationSensorComponent;
  let fixture: ComponentFixture<LocationSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationSensorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
