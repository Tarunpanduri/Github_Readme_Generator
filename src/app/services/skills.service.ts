import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BadgeService {
  private badges: any = {};

  constructor(private http: HttpClient) {
    this.http.get('badges.json').subscribe(data => {
      this.badges = data;
    });
  }

  getBadge(skill: string): string | null {
    const entry = this.badges[skill];
    if (!entry) return null;
    return `https://img.shields.io/badge/${encodeURIComponent(skill)}-${entry.color}?style=for-the-badge&logo=${entry.logo}&logoColor=${entry.logoColor}`;
  }

  getSuggestions(input: string): { name: string, badge: string }[] {
    return Object.keys(this.badges)
      .filter(key => key.toLowerCase().includes(input.toLowerCase()))
      .map(key => ({
        name: key,
        badge: this.getBadge(key)!
      }));
  }
}


