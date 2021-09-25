import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle.interface';

/**
 * Vehicle details Dumb component
 * Component displays info in the Angular Material's SlideNav
 */
@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  /**
   * Vehicle data
   */
  @Input() vehicle!: Vehicle;

  /**
   * Output emitter for close slideNav
   */
  @Output() closeSlideNav = new EventEmitter<null>();
  constructor() { }

  ngOnInit(): void {
  }

}
