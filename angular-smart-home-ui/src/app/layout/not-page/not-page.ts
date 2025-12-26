import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-page',
  imports: [],
  templateUrl: './not-page.html',
  styleUrl: './not-page.scss',
})
export class NotPage {
  router = inject(Router);

  toMainPage() {
    this.router.navigateByUrl('/');
  }
}
