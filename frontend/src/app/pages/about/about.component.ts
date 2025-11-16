import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageComponent } from '../../components/page/page.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PageComponent, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {}
