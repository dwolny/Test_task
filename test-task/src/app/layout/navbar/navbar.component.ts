import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { MapService } from 'src/app/services/map.service';

/**
 * Navbar component
 * Display page title, search input for the map and logout button
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  /**
   * Subject for search input
   */
  public search$ = new Subject<Event | null>();

  constructor(public appService: AppService, public mapService: MapService) { }

  /**
   * Handle with input value with debounce time
   * Set input value as mapService.searchInput as an upper case string
   */
  ngOnInit(): void {
    this.search$.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((e: Event | any) => {
      this.mapService.searchInput.next(e?.target?.value.toUpperCase());
    });
  }

}
