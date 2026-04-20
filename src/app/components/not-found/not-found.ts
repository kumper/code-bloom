import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {GenericFrameComponent} from '../generic-frame/generic-frame';
import {LanguageService} from '../../services/language.service';

const REDIRECT_SECONDS = 3;

@Component({
  selector: 'app-not-found',
  imports: [GenericFrameComponent],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  protected readonly langService = inject(LanguageService);

  readonly secondsLeft = signal(REDIRECT_SECONDS);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      const next = this.secondsLeft() - 1;
      this.secondsLeft.set(next);

      if (next === 0) {
        this.clearTimer();
        void this.router.navigate(['/'], {replaceUrl: true});
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}




