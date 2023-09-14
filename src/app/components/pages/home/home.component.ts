import { Component, OnInit } from '@angular/core';

import { Moment } from 'src/app/Interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment.development';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseUrlApi = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((response) => {
      const moments = response.data;

      moments.map((moment) => {
        moment.created_at = new Date(moment.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.allMoments = moments;
      this.moments = moments;
    });
  }

  searchMoment(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) =>
      moment.title.toLowerCase().includes(value)
    );
  }
}
