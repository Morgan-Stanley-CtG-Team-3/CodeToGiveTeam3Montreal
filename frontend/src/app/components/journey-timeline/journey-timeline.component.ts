import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-journey-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './journey-timeline.component.html',
  styleUrls: ['./journey-timeline.component.css']
})
export class JourneyTimelineComponent implements OnInit, OnDestroy {
  @Input() selectedAmount: number = 100;

  currentStep: number = 0;
  isPlaying: boolean = false;
  journeyPercentage: number = 0;

  private autoPlayInterval?: number;

  readonly TOTAL_JOURNEY_COST = 1875;
  readonly AUTO_PLAY_DURATION = 3000; // 3 seconds per slide

  ngOnInit(): void {
    this.calculateJourneyPercentage();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  calculateJourneyPercentage(): void {
    this.journeyPercentage = Math.min(
      Math.round((this.selectedAmount / this.TOTAL_JOURNEY_COST) * 100 * 10) / 10,
      100
    );
  }

  startAutoPlay(): void {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.autoPlayInterval = window.setInterval(() => {
      if (this.currentStep < 5) {
        this.nextStep();
      } else {
        // Stop when reaching the end
        this.currentStep = 0;
        this.stopAutoPlay();
      }
    }, this.AUTO_PLAY_DURATION);
  }
  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = undefined;
    }
    this.isPlaying = false;
  }

  nextStep(): void {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    this.currentStep = step;
    if (this.isPlaying) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }
}
