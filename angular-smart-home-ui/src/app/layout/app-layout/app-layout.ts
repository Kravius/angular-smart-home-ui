import { Component } from '@angular/core';
import { Sidebar } from 'app/sidebar/sidebar';
import { Dashboard } from 'app/dashboard/dashboard';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  imports: [Sidebar, Dashboard, RouterOutlet],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
})
export class AppLayout {}
