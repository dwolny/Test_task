import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Vehicle } from '../interfaces/vehicle.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  
  searchInput: BehaviorSubject<string> = new BehaviorSubject('');
  vehicles: { [key: string]: Vehicle }  = {};
  selectedVehicle!: Vehicle;
  constructor(private http: HttpClient) { }

  getVehicles(): Observable<{ data: { [key: string]: Vehicle } }> {
    return this.http.get<{ data: { [key: string]: Vehicle } }>('/map');
  }
}
