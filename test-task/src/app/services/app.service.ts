import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../interfaces/config.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  /**
   * Page name displayed in the navbar
   */
  public pageName = '';

  /**
   * Check if config is loaded or not. Used in HTML to load data after load config
   */
  public configLoaded = false;

  /**
   * Application config object
   */
  public config: AppConfig = {
    lat: 0,
    lang: 0,
    zoom: 0,
  }
  constructor(private http: HttpClient) {}

  /**
   * Load application configuration from API
   * After successfully load, set configLoad as true
   */
  loadConfig() {
    this.http.get<AppConfig>('/config').subscribe((res) => {
      this.config = res;
      this.configLoaded = true;
    }, e => {
      this.configLoaded = false;
    })
  }
}
