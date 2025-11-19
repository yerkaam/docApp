import {Component, inject} from '@angular/core';
import {ProfileComponent} from '../../pages/profile/profile.component';
import {AuthService} from '../../services/auth.service';
import {HeaderPartComponent} from '../header-part/header-part.component';
import {HomeComponent} from '../../pages/home/home.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-layout',
    imports: [
        RouterOutlet,
        HeaderPartComponent
    ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
}
