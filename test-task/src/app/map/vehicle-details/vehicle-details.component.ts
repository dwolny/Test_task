import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle.interface';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  @Input() vehicle!: Vehicle;
  @Output() closeSlideNav = new EventEmitter<null>();
  constructor() { }

  ngOnInit(): void {
  }

}
