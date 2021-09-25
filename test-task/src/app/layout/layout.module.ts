import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    NavbarComponent,
    MenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [NavbarComponent, MenuComponent]
})
export class LayoutModule { }
