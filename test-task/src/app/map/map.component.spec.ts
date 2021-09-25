import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { Vehicle } from '../interfaces/vehicle.interface';
import { MapService } from '../services/map.service';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let mapService: MapService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mapService = TestBed.inject(MapService);
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    const mockResponse = {
      data: {
        'SK12345': {
          lat: 51.8276976,
          lang: 16.9560484,
          id: 'SK12345',
          driver: {
            firstName: 'Jan',
            lastName: 'Kowalski',
            cardNumber: 12343523
          },
          vehicle: {
            vin: 'VF123354543',
            avgFuel: 20
          },
          tip: 0,
          time: {
            hours: 3,
            minutes: 38
          },
          nextPause: {
            hours: 2,
            minutes: 35
          }
        }
      }
    }

    spyOn(mapService, 'getVehicles').and.returnValue(of(mockResponse));
    component.loadData();
    expect(component.markers.length).toEqual(1);
    expect(mapService.vehicles).toEqual(mockResponse.data);
  });

  it('should clear object when API response error', () => {
    spyOn(mapService, 'getVehicles').and.returnValue(throwError(new Error()));
    component.loadData();
    expect(mapService.vehicles).toEqual({});
  });

  it('should add Vehicle to array', () => {
    const vehicle: Vehicle = {
      lat: 51.8276976,
      lang: 16.9560484,
      id: 'SK12345',
      driver: {
        firstName: 'Jan',
        lastName: 'Kowalski',
        cardNumber: 12343523
      },
      vehicle: {
        vin: 'VF123354543',
        avgFuel: 20
      },
      tip: 0,
      time: {
        hours: 3,
        minutes: 38
      },
      nextPause: {
        hours: 2,
        minutes: 35
      }
    };
    const spy = spyOn(component, 'createPopupDetails');
    component.markers = [];
    component.addVehicleToLayers(vehicle);
    expect(component.markers.length).toEqual(1);
    expect(spy).toHaveBeenCalled();
  });

  it('createPopupDetails should return string', () => {
    const vehicle: Vehicle = {
      lat: 51.8276976,
      lang: 16.9560484,
      id: 'SK12345',
      driver: {
        firstName: 'Jan',
        lastName: 'Kowalski',
        cardNumber: 12343523
      },
      vehicle: {
        vin: 'VF123354543',
        avgFuel: 20
      },
      tip: 0,
      time: {
        hours: 3,
        minutes: 38
      },
      nextPause: {
        hours: 2,
        minutes: 35
      }
    };
    const result = component.createPopupDetails(vehicle, 'test');
    expect(result).toBeInstanceOf(String);
  });
});
