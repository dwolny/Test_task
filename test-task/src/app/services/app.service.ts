import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../interfaces/config.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public pageName = '';
  public configLoaded = false;
  public config: AppConfig = {
    lat: 0,
    lang: 0,
    zoom: 0,
  }
  constructor(private http: HttpClient) {}

  loadConfig() {
    this.http.get<AppConfig>('/config').subscribe((res) => {
      this.config = res;
      this.configLoaded = true;
    })
  }
}
