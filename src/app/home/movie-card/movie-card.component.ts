import { Movie } from './../../shared/services/models/movie';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit, OnChanges {
  @Input () movie: Movie
  movieImg: string

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.movie) {
      this.movieImg = this.movie.image
    }
  }

  setDefaultPic() {
    this.movieImg = 'assets/images/batman-vs-godzilla.png'
  }

  routeToViewMovie(id: number) {
    this.router.navigate([`/movies/${id}`])
  }
}
