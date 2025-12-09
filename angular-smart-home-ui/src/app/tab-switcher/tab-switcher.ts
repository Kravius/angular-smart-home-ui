import { Component } from '@angular/core';
import { MatSlideToggle } from "@angular/material/slide-toggle";

@Component({
  selector: 'app-tab-switcher',
  imports: [MatSlideToggle],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher {}
