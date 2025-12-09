import { Component } from '@angular/core';
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { MatTabGroup, MatTab } from "@angular/material/tabs";
import { ɵEmptyOutletComponent } from "@angular/router";

@Component({
  selector: 'app-tab-switcher',
  imports: [MatSlideToggle, MatTabGroup, MatTab, ɵEmptyOutletComponent],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher {}
