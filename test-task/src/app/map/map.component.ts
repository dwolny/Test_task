import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { icon, latLng, Layer, marker, tileLayer } from 'leaflet';
import {  Subscription } from 'rxjs';
import { Vehicle } from '../interfaces/vehicle.interface';
import { AppService } from '../services/app.service';
import { MapService } from '../services/map.service';

/**
 * Map component
 * Main component to handle with OpenStreetMap using Leaflet
 * Component load OpenStreetMap map, after that component calls API
 * to get vehicles informations.
 * When vehicles are available, component create markers on the map and bind to events (e.g. popup)
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  /**
   * Array with active markers
   */
  public markers: Layer[] = [];

  /**
   * Leaflet options object
   */
  public options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: this.appService.config.zoom,
    center: latLng(this.appService.config.lat, this.appService.config.lang)
  };

  /**
   * Last selected vehicle ID from search input
   */
  private lastId = '';

  /**
   * Subscription for mapService.searchInput
   */
  private vehicleSearchSubscription!: Subscription;

  /**
   * Hook to the drawer HTML element
   */
  @ViewChild('drawer') drawer!: MatDrawer;


  constructor(public appService: AppService, public mapService: MapService, private translateService: TranslateService) { }

  /**
   * Start function
   * Set page name and call service to load data
   * Additionaly, subscribe to searchInput behaviorsubject and make some simply logic for check if input value is an vehicle ID or not.
   */
  ngAfterViewInit(): void {
    this.appService.pageName = 'map';
    this.loadData();
    this.vehicleSearchSubscription = this.mapService.searchInput.subscribe((id: string) => {
      if (id in this.mapService.vehicles) {
        this.selectVehicle(id, '-active');
        this.lastId = id;
      } else {
        this.selectVehicle(this.lastId, '');
      }
    })
  }

  /**
   * Unsubscribe from searchInput subscription.
   */
  ngOnDestroy(): void {
    this.vehicleSearchSubscription.unsubscribe();
  }

  /**
   * Load vehicles to the map component
   * First, clear markers array.
   * After that, call API via mapService function, after that
   * create vehicle as a layer
   */
  loadData(): void {
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

  /**
   * Create Leaflet's marker from Vehicle
   * @param vehicle {Vehicle} Single vehicle 
   */
  addVehicleToLayers(vehicle: Vehicle): void {
    this.translateService.get(`tip.${vehicle.tip}`, vehicle.time).subscribe((res) => {
      const layer = marker([vehicle.lat, vehicle.lang], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/plugins/leaflet/images/marker-icon.png'
        }),
        title: vehicle.id
      });
      this.markers.push(layer);
      this.markers[this.markers.length - 1].bindPopup(this.createPopupDetails(vehicle, res));
    });
  }

  /**
   * Function called after select/deselect vehicle from search input value
   * If vehicle is selected, change icon image and open popup
   * !IMPORTANT: ngx-leaflet has a problem with handle .openPopup() function.
   *             In this case I don't care about it and I didn't create hack for that
   * @param id {string} Vehicle ID
   * @param suffix {string} Suffix for marker icon (if selected suffix = '-active', otherwise suffix = '')
   */
  selectVehicle(id: string, suffix: string): void {
    for (let i = 0; i < this.markers.length; i++) {
      const markerCopy: any = this.markers[i];
      if (markerCopy.options.title == id) {
        const vehicle: Vehicle = this.mapService.vehicles[id];
        this.translateService.get(`tip.${vehicle.tip}`, vehicle.time).subscribe((res) => {
          this.markers.splice(i, 1);
          const layer = marker([vehicle.lat, vehicle.lang], {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: `assets/plugins/leaflet/images/marker-icon${suffix}.png`
            }),
            title: vehicle.id
          });
          this.markers.push(layer);
          this.markers[this.markers.length - 1].bindPopup(this.createPopupDetails(vehicle, res));
          if (suffix.length && !this.markers[this.markers.length - 1].isPopupOpen()) {
            console.warn('otwieramy popup');
            this.markers[this.markers.length - 1].openPopup();
          }
        });
      }
    }
  }

  /**
   * Create popup information as a string.
   * Leaflet supports only string as popup content, so we have to use function something like that.
   * @param vehicle {Vehicle} Vehicle data
   * @param res {string} Information from TranslateService
   * @returns {string} Popup content
   */
  createPopupDetails(vehicle: Vehicle, res: string): string {
      return `
      <div class="vehicle-popup get-details" data-id="${vehicle.id}">
      <p class="vehicle-popup__item"><b>Imię: </b>${vehicle.driver.firstName}</p>
      <p class="vehicle-popup__item"><b>Nazwisko: </b>${vehicle.driver.lastName}</p>
      <p class="vehicle-popup__item"><b>Nr rejestracyjny: </b>${vehicle.id}</p>
      <hr />
      <a href="#" data-id="${vehicle.id}" class="get-details">${res}</a>
      </div>
    `;
  }

  /**
   * Host listener for click on the icon
   * @param event 
   */
  @HostListener('document:click', ['$event']) 
  clickout(event: MouseEvent | any) 
  { 
    if(event.target.classList.contains("get-details"))
      this.openSlideNav(event.target.getAttribute("data-id")); 
  }
  
  /**
   * Set vehicle with ID as selected vehicle and open SlideNav
   * @param id {string} Selected vehicle ID
   */
  openSlideNav(id: string) {
    this.mapService.selectedVehicle = this.mapService.vehicles[id];
    this.drawer.toggle();
  }

  /**
   * Close SlideNav after child component Output() is called.
   */
  closeSlideNav(): void {
    this.drawer.close();
  }
}
