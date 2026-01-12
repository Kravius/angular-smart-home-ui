import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Sidebar } from 'app/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayout {}
