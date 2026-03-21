import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GenericFrameComponent} from '../generic-frame/generic-frame';
import {SessionTokenService} from '../../services/session-token.service';

@Component({
  selector: 'app-welcome',
  imports: [ReactiveFormsModule, GenericFrameComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class WelcomeComponent {
  private readonly router = inject(Router);
  private readonly tokenService = inject(SessionTokenService);

  readonly usernameControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(1)],
  });

  onSubmit(): void {
    if (this.usernameControl.invalid) {
      this.usernameControl.markAsTouched();
      return;
    }
    const token = this.tokenService.createToken(this.usernameControl.value);
    const encoded = this.tokenService.encode(token);
    void this.router.navigate(['/quiz'], {queryParams: {token: encoded}});
  }
}
