import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, output} from '@angular/core';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-bloom-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bloom-loader.html',
  styleUrl: './bloom-loader.css',
  host: {
    'role': 'status',
    'aria-label': 'Loading quiz, please wait',
  },
})
export class BloomLoaderComponent implements OnInit {
  done = output<void>();

  private readonly destroyRef = inject(DestroyRef);
  protected readonly langService = inject(LanguageService);

  ngOnInit(): void {
    const id = setTimeout(() => this.done.emit(), 5000);
    this.destroyRef.onDestroy(() => clearTimeout(id));
  }
}
