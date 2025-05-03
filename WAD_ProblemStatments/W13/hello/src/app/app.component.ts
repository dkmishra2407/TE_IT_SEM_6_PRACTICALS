import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { HelloDevanshComponent } from './hello-devansh/hello-devansh.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HelloWorldComponent,HelloDevanshComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hello';
}
