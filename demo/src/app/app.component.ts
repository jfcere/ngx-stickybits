import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  onSticky(sticky: boolean) {
    console.log(sticky ? '+ STICKY' : '- UNSTICK');
  }

  onStuck(stuck: boolean) {
    console.log(stuck ? '+ STUCK' : '- UNSTUCK');
  }
}
