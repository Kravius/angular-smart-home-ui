import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-form',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-form.html',
  styleUrl: './delete-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteForm {}
