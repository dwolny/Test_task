import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public search$ = new Subject<Event | null>();
  constructor(public appService: AppService, public mapService: MapService) { }

  ngOnInit(): void {
    this.search$.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((e: Event | any) => {
      if (e?.target?.value.length) {
        this.mapService.searchInput.next(e?.target?.value.toUpperCase());
      }
    });
  }

}
