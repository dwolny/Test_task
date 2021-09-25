import { AfterViewInit, Component } from '@angular/core';
import { circle, latLng, marker, polygon, tileLayer } from 'leaflet';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(51.8276976, 16.9560484)
  };
  layers = [
    marker([ 51.8276976, 16.9560484 ])
  ];
  constructor(public appService: AppService) { }

  ngAfterViewInit(): void {
    this.appService.pageName = 'map';
  }
}
