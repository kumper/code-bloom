import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-generic-frame',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './generic-frame.html',
  styleUrl: './generic-frame.css',
  standalone: true
})
export class GenericFrameComponent {
}
