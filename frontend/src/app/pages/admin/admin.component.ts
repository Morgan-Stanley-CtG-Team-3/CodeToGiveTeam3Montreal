import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageComponent} from '../../components/page/page.component';

interface MonthlyData {
  month: string;
  value: number;
}

interface DonorSegment {
  label: string;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, PageComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  // Revenue data
  selectedPeriod: 'week' | 'lastWeek' | 'month' = 'week';
  revenueData: MonthlyData[] = [];

  // Revenue stats
  thisMonthRevenue = 57000;
  lastMonthRevenue = 14000;
  thisMonthChange = 14.5;
  lastMonthChange = -4.5;

  // Donor stats
  totalDonors = 356;
  donorTrend = [60, 45, 70, 100, 55];

  // Summary data
  summaryData: DonorSegment[] = [
    { label: 'One-time Donations', percentage: 25, color: 'bg-yellow-400' },
    { label: 'Monthly Recurring', percentage: 70, color: 'bg-blue-500' },
    { label: 'Corporate Partners', percentage: 34, color: 'bg-green-400' }
  ];

  ngOnInit() {
    this.loadRevenueData();
  }

  getAbsoluteValue(value: number): number {
    return Math.abs(value);
  }

  loadRevenueData() {
    // Simulate dynamic data - replace with actual service call
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.revenueData = months.map(month => ({
      month,
      value: Math.floor(Math.random() * 100) + 30
    }));
  }

  selectPeriod(period: 'week' | 'lastWeek' | 'month') {
    this.selectedPeriod = period;
    this.loadRevenueData();
  }

  getRevenueHeight(value: number): string {
    return `${value}%`;
  }

  formatCurrency(value: number): string {
    return `$${(value / 1000).toFixed(0)}k`;
  }

  createReport() {
    console.log('Creating report...');
    // Implement report generation logic
  }
}
