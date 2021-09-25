import { AfterViewInit, Component, HostListener } from '@angular/core';
import { circle, icon, latLng, Layer, marker, polygon, tileLayer } from 'leaflet';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  public markers: Layer[] = [];
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(51.8276976, 16.9560484)
  };
  constructor(public appService: AppService) { }

  ngAfterViewInit(): void {
    this.appService.pageName = 'map';
    this.addLayer();
  }
  addLayer() {
    const layer = marker([51.8276976, 16.9560484], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/plugins/leaflet/images/marker-icon.png',
        shadowUrl: 'assets/img_static/map/markerNoShadow.png'
      })
    });
    this.markers.push(layer);
    this.markers[this.markers.length - 1].bindPopup('<a href="#" data-id="id" class="get-details">Test</a>');
  }

  @HostListener('document:click', ['$event']) 
  clickout(event: MouseEvent | any) 
  { 
    if(event.target.classList.contains("get-details"))
      this.testControl(event.target.getAttribute("data-id")); 
  }
  
  testControl(id: string) {
    console.log(id);
  }
}
