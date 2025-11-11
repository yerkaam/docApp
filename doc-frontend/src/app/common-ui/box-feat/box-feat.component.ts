import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-box-feat',
  imports: [],
  templateUrl: './box-feat.component.html',
  styleUrl: './box-feat.component.css'
})
export class BoxFeatComponent {
  @Input() information!: {
    imgLink: string;
    label: string;
    description: string;
  };
}
