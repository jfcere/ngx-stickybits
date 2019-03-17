import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  blueSticky = false;
  blueStuck = false;
  greenSticky = false;
  greenStuck = false;
  redSticky = false;
  redStuck = false;
}
