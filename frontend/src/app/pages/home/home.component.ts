// home.component.ts
import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImpactTrackerComponent} from '../../components/impact-tracker/impact-tracker.component';
import {DonationFormComponent} from '../../components/donation-form/donation-form.component';
import {AchievementsComponent} from '../../components/achievements/achievements.component';
import {AiChatComponent} from '../../components/ai-chat/ai-chat.component';
import {QuizComponent} from '../../components/quiz/quiz.component';
import {JourneyTimelineComponent} from '../../components/journey-timeline/journey-timeline.component';
import {LeaderboardComponent} from '../../components/leaderboard/leaderboard.component';
import {PageComponent} from '../../components/page/page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PageComponent,
    ImpactTrackerComponent,
    DonationFormComponent,
    AchievementsComponent,
    AiChatComponent,
    QuizComponent,
    JourneyTimelineComponent,
    LeaderboardComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  config?: any; // Or define a proper interface
  showChat: boolean = true; // Or false, depending on your needs

  ngOnInit(): void {
    // Initialize config if needed
    this.config = {
      impact_counter_title: 'Our Impact'
      // Add other config properties
    };
  }

  onDonateClick(): void {
    // Implement donation logic
    // e.g., navigate to donation form or scroll to it
    const donationSection = document.querySelector('app-donation-form');
    donationSection?.scrollIntoView({ behavior: 'smooth' });
  }
}

