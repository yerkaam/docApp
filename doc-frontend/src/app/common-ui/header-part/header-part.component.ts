import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header-part',
  imports: [
    RouterLink
  ],
  templateUrl: './header-part.component.html',
  styleUrl: './header-part.component.css'
})
export class HeaderPartComponent {
authService = inject(AuthService);
ngOnInit() {
}
logout(){
  this.authService.logout();
}
}
