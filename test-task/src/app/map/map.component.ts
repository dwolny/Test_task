import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { circle, icon, latLng, Layer, marker, polygon, tileLayer } from 'leaflet';
import { Subscriber, Subscription } from 'rxjs';
import { Vehicle } from '../interfaces/vehicle.interface';
import { AppService } from '../services/app.service';
import { MapService } from '../services/map.service';

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
    zoom: this.appService.config.zoom,
    center: latLng(this.appService.config.lat, this.appService.config.lang)
  };

  private vehicleSearchSubscription!: Subscription;
  @ViewChild('drawer') drawer!: MatDrawer;
  constructor(public appService: AppService, private mapService: MapService) { }

  ngAfterViewInit(): void {
    this.appService.pageName = 'map';
    this.loadData();
    this.vehicleSearchSubscription = this.mapService.searchInput.subscribe((id: string) => {
      if (id in this.mapService.vehicles) {
        this.selectVehicle(id);
      }
    })
  }

  ngOnDestroy(): void {
    this.vehicleSearchSubscription.unsubscribe();
  }

  loadData() {
    this.markers = [];
    this.mapService.getVehicles().subscribe(({ data }) => {
      this.mapService.vehicles = data;
      for (const vehicleId in data) {
        this.addVehicleToLayers(data[vehicleId]);
      }
    }, e => {
      this.mapService.vehicles = {};
    })
  }

  addVehicleToLayers(vehicle: Vehicle) {
    const layer = marker([vehicle.lat, vehicle.lang], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/plugins/leaflet/images/marker-icon.png'
      }),
      title: vehicle.id
    });
    this.markers.push(layer);
    this.markers[this.markers.length - 1].bindPopup(this.createPopupDetails(vehicle));
  }

  selectVehicle(id: string): void {
    for (let i = 0; i < this.markers.length; i++) {
      const markerCopy: any = this.markers[i];
      if (markerCopy.options.title == id) {
        this.markers.splice(i, 1);
        const vehicle: Vehicle = this.mapService.vehicles[id];
        const layer = marker([vehicle.lat, vehicle.lang], {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/plugins/leaflet/images/marker-icon-active.png'
          }),
          title: vehicle.id
        });
        this.markers.push(layer);
        this.markers[this.markers.length - 1].bindPopup(this.createPopupDetails(vehicle));
        if (!this.markers[this.markers.length - 1].isPopupOpen()) {
          console.warn('otwieramy popup')
          this.markers[this.markers.length - 1].openPopup();
          break;
        }
      }
    }
  }


  createPopupDetails(vehicle: Vehicle): string {
    return `
      <div class="vehicle-popup">
      <p class="vehicle-popup__item"><b>Imię: </b>${vehicle.firstName}</p>
      <p class="vehicle-popup__item"><b>Nazwisko: </b>${vehicle.lastName}</p>
      <p class="vehicle-popup__item"><b>Nr rejestracyjny: </b>${vehicle.id}</p>
      <hr />
      <a href="#" data-id="${vehicle.id}" class="get-details">Zobacz szczegóły</a>
      </div>
    `;
  }

  @HostListener('document:click', ['$event']) 
  clickout(event: MouseEvent | any) 
  { 
    if(event.target.classList.contains("get-details"))
      this.testControl(event.target.getAttribute("data-id")); 
  }
  
  testControl(id: string) {
    this.mapService.selectedVehicle = this.mapService.vehicles[id];
    this.drawer.toggle();
  }
}
