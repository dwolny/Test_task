import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load config', () => {
    const expectedMock = {
      lat: 51.8276976,
      lang: 16.9560484,
      zoom: 5
    }
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.returnValue(of(expectedMock));
    service.loadConfig();
    expect(service.config).toEqual(expectedMock);
    expect(service.configLoaded).toBeTruthy();
  });

  it('shouldn`t load config', () => {
    const expectedMock = {
      lat: 51.8276976,
      lang: 16.9560484,
      zoom: 5
    }
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.returnValue(throwError(new Error()))
    service.loadConfig();
    expect(service.config).not.toEqual(expectedMock)
    expect(service.configLoaded).toBeFalsy();
  })
});
