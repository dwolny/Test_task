import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MapRoutingModule } from './map-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    MapComponent,
    VehicleDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RouterModule,
    MapRoutingModule,
    LeafletModule
  ],
  exports: [MapComponent]
})
export class MapModule { }
