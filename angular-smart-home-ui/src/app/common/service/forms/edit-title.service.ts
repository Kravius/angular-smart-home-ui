import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class EditTitleService {
  readonly dashboardTitleControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]);

  readonly tabTitleControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  startEditDashboardTitle(currentTitle: string): void {
    this.dashboardTitleControl.setValue(currentTitle);
    this.dashboardTitleControl.markAsPristine();
  }

  startEditTabTitle(currentTitle: string): void {
    this.tabTitleControl.setValue(currentTitle);
    this.tabTitleControl.markAsPristine();
  }

  reset(): void {
    this.dashboardTitleControl.reset();
    this.tabTitleControl.reset();
  }
}
