import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {GenericFrameComponent} from '../generic-frame/generic-frame';

@Component({
  selector: 'app-welcome',
  imports: [ReactiveFormsModule, GenericFrameComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
  standalone: true
})
export class WelcomeComponent {
  usernameControl = new FormControl<string>('', {nonNullable: true});

  onSubmit(): void {
    // Will be implemented later
  }
}
