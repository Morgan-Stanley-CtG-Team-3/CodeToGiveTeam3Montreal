import { Component, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-n8n-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './n8n-form.component.html',
  styleUrls: ['./n8n-form.component.css']
})
export class N8nFormComponent {
  private rawUrl = ''; // URL to n8n form

  openForm(){
    const url = new URL(this.rawUrl);
    url.searchParams.append('embedded', 'true');
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
