import { SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ApiService } from 'app/common/service/api.service';
import { AuthService } from 'app/common/service/auth.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  authService = inject(AuthService);

  userProfile = computed(() => this.authService.userProfile());

  userLogout() {
    this.authService.logout();
  }
}
