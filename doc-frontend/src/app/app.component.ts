import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderPartComponent} from './common-ui/header-part/header-part.component';
import {FooterComponent} from './common-ui/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderPartComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
