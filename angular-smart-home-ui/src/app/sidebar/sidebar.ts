import { Component, inject, signal, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DeviceDetectorService } from '../common/service/device-detector.service';
import { Footer } from './footer/footer';
import { Header } from "./header/header";
import { Menu } from "./menu/menu";

@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule, MatSidenavModule, Footer, Header, Menu],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly #breakPointService = inject(DeviceDetectorService);

  protected isMobile = this.#breakPointService.isMobile;

  public ngOnInit() {}
}
