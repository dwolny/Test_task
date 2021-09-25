import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehicle } from '../interfaces/vehicle.interface';

/**
 * Map Service
 * Service used to handle with map data (e.g. vehicles)
 */
@Injectable({
  providedIn: 'root'
})
export class MapService {
  
  /**
   * Property to handle with search input in the navbar.
   * Property emits every time when input is changed (with debounce)
   */
  searchInput: BehaviorSubject<string> = new BehaviorSubject('');

  /**
   * Object to grab loaded vehicles.
   * Example:
   * {
   *    'SK11111': Vehicle,
   *    'SK22222': Vehicle
   * }
   */
  vehicles: { [key: string]: Vehicle }  = {};

  /**
   * Details from selected vehicle
   */
  selectedVehicle!: Vehicle;


  constructor(private http: HttpClient) { }

  /**
   * Load vehicles from the API
   * @returns {{ data: { [key: string]: Vehicle } }} API data
   * Example return: 
   * {
   *    data: {
   *      'SK1111': Vehicle // Vehicle interface
   *    }
   * }
   */
  getVehicles(): Observable<{ data: { [key: string]: Vehicle } }> {
    return this.http.get<{ data: { [key: string]: Vehicle } }>('/map');
  }
}
