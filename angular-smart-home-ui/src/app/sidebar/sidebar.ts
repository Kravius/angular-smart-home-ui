import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DeviceDetectorService } from '../common/service/device-detector.service';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Menu } from './menu/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule, MatSidenavModule, MatIconModule, Footer, Header, Menu],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  readonly #breakPointService = inject(DeviceDetectorService);

  protected isMobile = this.#breakPointService.isMobile;
}
