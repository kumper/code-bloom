import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GenericFrameComponent} from '../generic-frame/generic-frame';
import {SessionTokenService} from '../../services/session-token.service';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-welcome',
  imports: [ReactiveFormsModule, GenericFrameComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class WelcomeComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly tokenService = inject(SessionTokenService);
  protected readonly langService = inject(LanguageService);

  readonly usernameControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(1)],
  });

  ngOnInit(): void {
    const existing = this.tokenService.load();
    if (existing) {
      void this.router.navigate(['/quiz']);
    }
  }

  onSubmit(): void {
    if (this.usernameControl.invalid) {
      this.usernameControl.markAsTouched();
      return;
    }
    const token = this.tokenService.createToken(this.usernameControl.value);
    this.tokenService.save(token);
    void this.router.navigate(['/quiz']);
  }
}
