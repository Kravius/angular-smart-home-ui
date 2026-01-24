import { Injectable, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class EditTitleService {
  // FormControls для редактирования
  readonly dashboardTitleControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]);

  readonly tabTitleControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  // Старт редактирования дашборда
  startEditDashboardTitle(currentTitle: string): void {
    this.dashboardTitleControl.setValue(currentTitle);
    this.dashboardTitleControl.markAsPristine();
  }

  // Старт редактирования вкладки
  startEditTabTitle(currentTitle: string): void {
    this.tabTitleControl.setValue(currentTitle);
    this.tabTitleControl.markAsPristine();
  }

  // Сброс всех форм
  reset(): void {
    this.dashboardTitleControl.reset();
    this.tabTitleControl.reset();
  }
}
